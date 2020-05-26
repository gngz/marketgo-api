'use strict'

/*
|--------------------------------------------------------------------------
| CategorySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Category = use('App/Models/Category')

class CategorySeeder {
  async run() {

    const Mercearia = await Category.create({ name: "Mercearia", image: "https://lh3.googleusercontent.com/proxy/C3f0gaRoiF-PGIMaWWZiDvLDB5-7fn2nucmLBLfB314pyS9uBvsA3Q6KJ6Y1XNbooB6i1MKG047f1_Fyas-tUSw1SidSgUsFXASB0AzrT29V2ByLhQhcQXYJrusLSkJreTRiy4OF39zbupz1IdNNL563uawdvUqtk9jO" });
    /*   (await Category.create({ name: "Arroz, Massa e Farinha" })).father().associate(Mercearia);
      (await Category.create({ name: "Azeite, Óleo e Vinagre" })).father().associate(Mercearia);
      (await Category.create({ name: "Molhos, Temperos e Sal" })).father().associate(Mercearia);
      (await Category.create({ name: "Conservas, Salsichas e Legumes" })).father().associate(Mercearia);
      (await Category.create({ name: "Açúcar, Mel e Doces" })).father().associate(Mercearia);
      (await Category.create({ name: "Bolachas e Bolos" })).father().associate(Mercearia);
      (await Category.create({ name: "Barras e Cereais" })).father().associate(Mercearia);
      (await Category.create({ name: "Doçaria e Chocolate" })).father().associate(Mercearia);
      (await Category.create({ name: "Sobremesas" })).father().associate(Mercearia); */

    const Bebidas = await Category.create({ name: "Bebidas", image: "https://icons.iconarchive.com/icons/papirus-team/papirus-apps/256/github-mirkobrombin-bottles-icon.png" });
    /*     (await Category.create({ name: "Água" })).father().associate(Bebidas);
        (await Category.create({ name: "Sumos e Néctares" })).father().associate(Bebidas);
        (await Category.create({ name: "Refrigerantes" })).father().associate(Bebidas);
        (await Category.create({ name: "Cervejas e Sidras" })).father().associate(Bebidas);
        (await Category.create({ name: "Vinho" })).father().associate(Bebidas);
        (await Category.create({ name: "Espumantes" })).father().associate(Bebidas);
        (await Category.create({ name: "Chás, Cafés e Achoclatados" })).father().associate(Bebidas); */

    const Lacticinios = await Category.create({ name: "Lacticínios", image: "https://cdn.iconscout.com/icon/free/png-256/cheese-1806482-1534540.png" });
    /*     (await Category.create({ name: "Iogurtes" })).father().associate(Lacticinios);
        (await Category.create({ name: "Leite" })).father().associate(Lacticinios);
        (await Category.create({ name: "Manetigas e Cremes Vegetais" })).father().associate(Lacticinios);
        (await Category.create({ name: "Sobremesas Refrigeradas" })).father().associate(Lacticinios);
        (await Category.create({ name: "Queijos" })).father().associate(Lacticinios);
     */

    const Limpeza = await Category.create({ name: "Limpeza", image: "https://icons.iconarchive.com/icons/robinweatherall/cleaning/256/bucket-icon.png" });
    /*     (await Category.create({ name: "Limpeza Geral" })).father().associate(Limpeza);
        (await Category.create({ name: "Limpeza WC" })).father().associate(Limpeza);
        (await Category.create({ name: "Limpeza Cozinha" })).father().associate(Limpeza);
        (await Category.create({ name: "Roupa" })).father().associate(Limpeza);
        (await Category.create({ name: "Ambientadores e Insecticidas" })).father().associate(Limpeza);
        (await Category.create({ name: "Sacos do Lixo" })).father().associate(Limpeza); */

    const Animais = await Category.create({ name: "Animais", image: "https://lh3.googleusercontent.com/proxy/itZ8xMlAZncBhBiqbLmXzNuQ_7xisUHfq8ghGTw-0sbMuMzIz4xg_AIpGsP-YgzfQTUYjjVuE1D8V32FtpG2UKNy_EV8iTzjh5QeKX3b5z00PXGEyzc" });
    /*     (await Category.create({ name: "Cão" })).father().associate(Animais);
        (await Category.create({ name: "Gato" })).father().associate(Animais);
        (await Category.create({ name: "Outros Animais" })).father().associate(Animais); */



  }
}

module.exports = CategorySeeder
