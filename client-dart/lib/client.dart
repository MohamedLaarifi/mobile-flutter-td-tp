import 'package:http/http.dart' as http;
import 'dart:convert';

const baseUrl = 'http://localhost:3000';

void main() async {
  await testApiCalls();
}

Future<void> testApiCalls() async {
  // 1. GET Produits
  print('=== Produits ===');
  final products = await fetchProducts();
  print(products);

  // 2. POST Produit
  final newProduct = {'name': 'AirPods', 'price': 199, 'stock': 15};
  await addProduct(newProduct);

  // 3. GET Commandes
  print('\n=== Commandes ===');
  final orders = await fetchOrders();
  print(orders);

  // 4. POST Commande
  final newOrder = {'product_id': 1, 'quantity': 2, 'date': DateTime.now().toString()};
  await addOrder(newOrder);
}

// Fonctions HTTP
Future<String> fetchProducts() async {
  final response = await http.get(Uri.parse('$baseUrl/products'));
  return response.body;
}

Future<void> addProduct(Map<String, dynamic> product) async {
  await http.post(
    Uri.parse('$baseUrl/products'),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode(product),
  );
}

Future<String> fetchOrders() async {
  final response = await http.get(Uri.parse('$baseUrl/orders'));
  return response.body;
}

Future<void> addOrder(Map<String, dynamic> order) async {
  await http.post(
    Uri.parse('$baseUrl/orders'),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode(order),
  );
}