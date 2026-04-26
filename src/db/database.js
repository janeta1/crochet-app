import { openDB } from "idb";

const DB_NAME = "stitchbook";
const DB_VERSION = 1;

export async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("projects")) {
        db.createObjectStore("projects", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("yarns")) {
        db.createObjectStore("yarns", { keyPath: "id" });
      }
    },
  });
}

// CRUD functions for Projects
export async function getAllProjects() {
    const db = await initDB();
    return db.getAll("projects");
}

// handles both add and update based on presence of id
export async function saveProject(project) {
    const db = await initDB();
    return db.put("projects", project);
}

export async function deleteProject(projectId) {
    const db = await initDB();
    return db.delete("projects", projectId);
}

// CRUD functions for Yarns
export async function getAllYarns() {
    const db = await initDB();
    return db.getAll("yarns");
}

export async function saveYarn(yarn) {
    const db = await initDB();
    return db.put("yarns", yarn);
}

export async function deleteYarn(yarnId) {
    const db = await initDB();
    return db.delete("yarns", yarnId);
}
