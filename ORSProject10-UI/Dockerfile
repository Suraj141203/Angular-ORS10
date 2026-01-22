# Stage 1 — Build Angular App (Apple Silicon Compatible)
# build stage
# ---------- Runtime Stage ----------
FROM nginx:alpine

# Remove default nginx config
RUN rm -rf /usr/share/nginx/html/*

# Copy already-built Angular dist
COPY dist/P10-UI/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


# # Use an official Node.js runtime as the base image
# FROM node:14 as build

# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json to the container
# COPY package*.json ./

# # Install the Angular CLI and dependencies
# RUN npm install -g @angular/cli
# RUN npm install

# # Copy the entire Angular project to the container
# COPY . .

# # Build the Angular application for production
# RUN ng build

# # Use NGINX as a lightweight web server to serve the Angular app
# FROM nginx:alpine

# # Copy the production build from the previous stage into NGINX's web root
# COPY --from=build /app/dist /usr/share/nginx/html

# # Expose the default Nginx port (usually port 80)
# EXPOSE 80

# # Start Nginx when the container is run
# CMD ["nginx", "-g", "daemon off;"]