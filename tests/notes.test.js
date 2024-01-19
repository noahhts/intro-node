import { describe, jest } from "@jest/globals";

jest.unstable_mockModule("../src/db.js", () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import("../src/db.js");
const { newNote, getAllNotes, removeNote } = await import("../src/notes.js");

beforeEach(() => {
  insertDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});

test("newNote inserts data and returns it", async () => {
  const data = {
    content: "this is my note",
    id: 1,
    tags: ["hello"],
  };
  insertDB.mockResolvedValue(data);

  const result = await newNote(data.content, data.tags);
  expect(result.content).toEqual(data.content);
  expect(result.tags).toEqual(data.tags);
});

test("getAllNotes returns all notes", async () => {
  const db = {
    notes: ["note1", "note2", "note3"],
  };
  getDB.mockResolvedValue(db);

  const result = await getAllNotes();
  expect(result).toEqual(db.notes);
});

describe("removeNote", () => {
  test("removeNote does nothing if id is not found", async () => {
    const notes = [
      { id: 1, content: "note 1" },
      { id: 2, content: "note 2" },
      { id: 3, content: "note 3" },
    ];
    saveDB.mockResolvedValue(notes);

    const idToRemove = 4;
    const result = await removeNote(idToRemove);
    expect(result).toBeUndefined();
  });

  it("should remove note if id is found", async () => {
    const notes = [
      { id: 1, content: "note 1" },
      { id: 2, content: "note 2" },
      { id: 3, content: "note 3" },
    ];
    saveDB.mockResolvedValue(notes);
    const db = {
      notes,
    };
    getDB.mockResolvedValue(db);

    const idToRemove = 2;
    const result = await removeNote(idToRemove);
    expect(result).toEqual(idToRemove);
  });
});
