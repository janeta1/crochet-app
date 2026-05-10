const BASE_URL = "http://localhost:3000";
let token = null;

async function getToken() {
  if (token) return token;
  const res = await fetch(`${BASE_URL}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role: "admin" }),
  });
  const data = await res.json();
  token = data.token;
  return token;
}

async function apiFetch(path, options = {}) {
  const t = await getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${t}`,
      ...options.headers,
    },
  });

  if (res.status === 401) {
    token = null; // clearing expired token
    throw new Error("Unauthorized. Token may have expired. Please try again.");
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Request failed: ${res.status}`);
  }

  if (res.status === 204) return null; // No content
  return res.json();
}

function transformPart(part) {
  return {
    ...part,
    totalRows: part.total_rows,
    completedRows: part.completed_rows,
    projectId: part.project_id,
  };
}

function transformYarn(y) {
  return {
    ...y,
    isFavorite: Boolean(y.is_favorite),
  };
}

function transformProject(p) {
  console.log("project yarns:", p.yarns);
  const {
    is_favorite,
    hook_size,
    time_spent,
    created_at,
    completed_at,
    ...rest
  } = p;
  return {
    ...rest,
    isFavorite: Boolean(is_favorite),
    hookSize: hook_size,
    timeSpent: time_spent,
    createdAt: created_at,
    completedAt: completed_at,
    parts: p.parts ? p.parts.map(transformPart) : [],
    sessions: p.sessions || [],
    yarns: p.yarns ? p.yarns.map(transformYarn) : [],
  };
}

export const api = {
  // Projects
  getProjects: async () => {
    const data = await apiFetch("/projects?limit=50&offset=0");
    return { ...data, data: data.data.map(transformProject) };
  },
  getProject: async (id) => {
    const p = await apiFetch(`/projects/${id}`);
    return transformProject(p);
  },
  createProject: async (data) => {
    const p = await apiFetch("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return transformProject(p);
  },
  updateProject: async (id, data) => {
    console.log("PUT data:", data);
    const p = await apiFetch(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return transformProject(p);
  },
  patchProject: async (id, data) => {
    const p = await apiFetch(`/projects/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return transformProject(p);
  },
  deleteProject: (id) => apiFetch(`/projects/${id}`, { method: "DELETE" }),

  // Sessions
  logSession: (data) =>
    apiFetch("/sessions", { method: "POST", body: JSON.stringify(data) }),

  // Yarns
  getYarns: async () => {
    const data = await apiFetch("/yarns?limit=50&offset=0");
    return { ...data, data: data.data.map(transformYarn) };
  },
  getYarn: async (id) => {
    const y = await apiFetch(`/yarns/${id}`);
    return transformYarn(y);
  },
  createYarn: async (data) => {
    const y = await apiFetch("/yarns", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return transformYarn(y);
  },
  updateYarn: async (id, data) => {
    const y = await apiFetch(`/yarns/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return transformYarn(y);
  },
  patchYarn: async (id, data) => {
    const y = await apiFetch(`/yarns/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    return transformYarn(y);
  },
  deleteYarn: (id) => apiFetch(`/yarns/${id}`, { method: "DELETE" }),
};
