const request = require("supertest");
const { app, books } = require("../src/1-book/books");

describe("POST /books", () => {
  beforeEach(() => {
    books.length = 0; // Limpa o array books antes de cada teste
  });

  it("deve adicionar um novo livro com sucesso", async () => {
    const newBook = { title: "Odisseia", author: "Homero" };

    const response = await request(app)
      .post("/books") // Corrigido para /books
      .send(newBook)
      .expect(201)
      .expect("Content-Type", /json/);

    expect(response.body).toMatchObject(newBook);
    expect(response.body).toHaveProperty("id");
  });

  it("deve retornar erro ao tentar adicionar livro sem titulo", async () => {
    const newBook = { author: "Mary Shelley" };

    const response = await request(app)
      .post("/books") // Corrigido para /books
      .send(newBook)
      .expect(400);

    expect(response.body).toEqual({ error: "Title and author are required" });
  });

  it("deve listar todos os livros", async () => {
    books.push({
      id: 1,
      title: "Romeu e Julieta",
      author: "Shakespeare",
      available: true,
    });

    const response = await request(app)
      .get("/books") // Corrigido para /books
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject({
      title: "Romeu e Julieta",
      author: "Shakespeare",
    });
  });
});
//a