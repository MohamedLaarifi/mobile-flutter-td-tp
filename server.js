const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const dataFile = 'data.json';

// Middleware
app.use(bodyParser.json());

// Helper functions
const readData = () => {
  try {
    return JSON.parse(fs.readFileSync(dataFile));
  } catch (e) {
    return { products: [], orders: [] }; // Structure par défaut
  }
};

const saveData = (data) => fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

// Routes Produits
app.get('/products', (req, res) => {
  const data = readData();
  res.json(data.products);
});

app.post('/products', (req, res) => {
  const data = readData();
  const newProduct = { 
    id: Date.now(), // ID auto-généré
    ...req.body 
  };
  data.products.push(newProduct);
  saveData(data);
  res.status(201).json(newProduct);
});

// Routes Commandes
app.get('/orders', (req, res) => {
  const data = readData();
  res.json(data.orders);
});

app.post('/orders', (req, res) => {
  const data = readData();
  const newOrder = {
    id: Date.now(),
    ...req.body,
    date: new Date().toISOString()
  };
  data.orders.push(newOrder);
  saveData(data);
  res.status(201).json(newOrder);
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`\n---\nAPI REST opérationnelle :`);
  console.log(`GET /products       - Liste des produits`);
  console.log(`POST /products      - Ajouter un produit`);
  console.log(`GET /orders         - Liste des commandes`);
  console.log(`POST /orders        - Créer une commande`);
  console.log(`\nAccès : http://localhost:${port}\n---\n`);
});