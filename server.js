const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// data buku
let books = [
  { id: 1, title: "Laskar Pelangi", author: "Andrea Hirata", year: 2005 }
];

app.get('/api/books', (req, res) => {
  res.status(200).json(books);
});

app.post('/api/books', (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }
  const newBook = { id: books.length + 1, title, author, year };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author, year } = req.body;
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ message: "Buku tidak ditemukan" });
  }
  books[bookIndex] = { id, title, author, year };
  res.status(200).json(books[bookIndex]);
});

app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ message: "Buku tidak ditemukan" });
  }
  books.splice(bookIndex, 1);
  res.status(200).json({ message: "Buku berhasil dihapus" });
});

// data siswa (tugas)
let students = [];
let nextId = 1;

app.get('/api/students', (req, res) => {
  res.status(200).json(students);
});

app.post('/api/students', (req, res) => {
  const { name, birthPlace, birthDate, activeAddress } = req.body;

  if (!name || !birthPlace || !birthDate || !activeAddress) {
    return res.status(400).json({
      message: "Data tidak lengkap. name, birthPlace, birthDate, dan activeAddress wajib diisi"
    });
  }

  const newStudent = { id: nextId++, name, birthPlace, birthDate, activeAddress };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.put('/api/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Siswa tidak ditemukan" });
  }

  const { name, activeAddress } = req.body;
  if (name) student.name = name;
  if (activeAddress) student.activeAddress = activeAddress;

  res.status(200).json(student);
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
