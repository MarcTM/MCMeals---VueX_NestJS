<h1>MCMEALS</h1>

Main reason of this project is to build an app to sell supplements and meals. Also clients can make their custom meals, by choosing up to 3 different ingredients.
---

## Getting started

To run this repository locally:

- Clone this repository to a folder.
- Check .env.example in the backend to create you own .env.
- Install PostgreSQL and run it. Then create the database that you are going to use for the application.
- Set your database configuration into the NestJS main.ts file.
- After installing both backend and frontend dependencies with **npm install**, you can execute them with **mpm start**.


---

## Features

| Page | Features |
| - | - |
| Home | The home has the categories, and some most popular products. You can click in one of them to see their information and later add to cart. By clickng on a category you can also see the products related to it, and also filter products by the category subcategories.. |
| Shop | Lists all products with a search bar, so you can search by name or description. Also subcategories are shown here, to filter some products. |
| Cart | Lists the products in your cart, with extra informatino if there are custom meals. You can see the subtotal of the price, and change the amount of the produts that you added before. |
| Custom Meals | Clients can build their own meals with some ingredients that the company offers. They can choose up to 3 sides for the custom meal. |



<br>

| Services | Features |
| - | - |
| Register | You can register to the page, to later sign in. |
| Login | You can login to be able to comment products or add to them to cart. |
| Comments | You can add comments to the products, and also delete them after, if you don't want them. |
| Cart | You can add and remove products from your cart. Also change the amount. |

<br>

| Technical Features |  |
| - | - |
| Authentication with JWT | You need to be signed in to be allowed to do some actions |
| Guards | There are Role Guards and UserIsUser Guards. First ones to allow certain features to certain roles (normal user or admin). And the second one to allow only the clients to change their personal information/data (delete comments, update cart). |
| TypeORM | Database tables are done with NestJS and TypeORM. There are also some relations, like OneToMany, ManyToOne, ManyToMany. |

---

### Technologies used in this project

* NestJS
* VueX
* PostgreSQL

### Other technologies used

* JWT
* Docker
* Docker-Compose

---
To run this application with Docker-Compose:

- Clone this repository to a folder
- Check .env.example in the backend to create you own .env.
- Install PostgreSQL and run it. Then create the database that you are going to use for the application.
- Run **suydo docker-compose up --build** to run the app.
---
