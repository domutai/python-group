# TEAM 1
The Avengers

# App Name
Assemble

# Live Demo
[Assemble]

# Overview
Assemble is a superhero-themed marketplace that brings together enthusiasts to buy, sell, and trade superhero-related items. From custom outfits and gadgets to memorabilia, Assemble is the perfect platform for creators and collectors to connect in a unique shopping experience. Inspired by Etsy's business model and superhero fandom culture.

## Technologies Used
Frontend: React, Vite, Redux
Backend: Flask, Python
Database: PostgreSQL
Authentication: JSON Web Tokens (JWT)
Hosting: render.com

## Key Features:
### **Products**
- 🛍️ **Browse Products**: View all available products on the platform.
- ✏️ **Create Products**: Add new products as a seller.
- 🔄 **Update Products**: Edit the details of products you own.
- 🗑️ **Delete Products**: Remove products you no longer want to list.

### **Reviews**
- ⭐ **View Reviews**: Check out reviews left by other users for a product.
- ✍️ **Add Reviews**: Share your experience by writing a review for a product.
- ✏️ **Edit Reviews**: Update your review when your opinion changes.
- 🗑️ **Delete Reviews**: Remove your review from a product.

### **Shopping Cart**
- 🛒 **View Cart**: See all the products added to your shopping cart.
- ➕ **Add to Cart**: Add products to your shopping cart for purchase.
- ➖ **Remove from Cart**: Remove unwanted products from your shopping cart.
- 💳 **Complete Transactions**: Perform a "transaction" to finalize your purchase.

### **Favorites**
- ❤️ **View Favorites**: Access all your favorite products in one place.
- ⭐ **Add Favorites**: Mark products as favorites for easy access later.
- ❌ **Remove Favorites**: Unfavorite products you no longer wish to keep.

## Installation Guide

1. Clone this repository.

   ```bash
   git clone https://github.com/domutai/python-group.git
   ```

2. Navigate to the Directory:

   ```bash
   cd python-group
   ```

3. Set Up Virtual Environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

5. Create a __.env__ file based on the example with proper settings for your
   development environment.

6. Make sure the SQLite3 database connection URL is in the __.env__ file.

7. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

8. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

9. The React frontend has no styling applied. Copy the __.css__ files from your
   Authenticate Me project into the corresponding locations in the
   __react-vite__ folder to give your project a unique look.

10. To run the React frontend in development, `cd` into the __react-vite__
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. The starter has modified the `npm run build`
   command to include the `--watch` flag. This flag will rebuild the __dist__
   folder whenever you change your code, keeping the production version up to
   date.

## Deployment through Render.com

First, recall that Vite is a development dependency, so it will not be used in
production. This means that you must already have the __dist__ folder located in
the root of your __react-vite__ folder when you push to GitHub. This __dist__
folder contains your React code and all necessary dependencies minified and
bundled into a smaller footprint, ready to be served from your Python API.

Begin deployment by running `npm run build` in your __react-vite__ folder and
pushing any changes to GitHub.

Refer to your Render.com deployment articles for more detailed instructions
about getting started with [Render.com], creating a production database, and
deployment debugging tips.

From the Render [Dashboard], click on the "New +" button in the navigation bar,
and click on "Web Service" to create the application that will be deployed.

Select that you want to "Build and deploy from a Git repository" and click
"Next". On the next page, find the name of the application repo you want to
deploy and click the "Connect" button to the right of the name.

Now you need to fill out the form to configure your app. Most of the setup will
be handled by the __Dockerfile__, but you do need to fill in a few fields.

Start by giving your application a name.

Make sure the Region is set to the location closest to you, the Branch is set to
"main", and Runtime is set to "Docker". You can leave the Root Directory field
blank. (By default, Render will run commands from the root directory.)

Select "Free" as your Instance Type.

### Add environment variables

In the development environment, you have been securing your environment
variables in a __.env__ file, which has been removed from source control (i.e.,
the file is gitignored). In this step, you will need to input the keys and
values for the environment variables you need for production into the Render
GUI.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from the **External Database URL** field)

**Note:** Add any other keys and values that may be present in your local
__.env__ file. As you work to further develop your project, you may need to add
more environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment.

### Deploy

Now you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your Dockerfile
commands being executed and any errors that occur.

When deployment is complete, open your deployed site and check to see that you
have successfully deployed your Flask application to Render! You can find the
URL for your site just below the name of the Web Service at the top of the page.

**Note:** By default, Render will set Auto-Deploy for your project to true. This
setting will cause Render to re-deploy your application every time you push to
main, always keeping it up to date.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/
[Assemble]:(https://python-group-gl7x.onrender.com/)