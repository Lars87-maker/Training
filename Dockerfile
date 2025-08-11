
# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN if [ -f package-lock.json ]; then npm ci;       elif [ -f pnpm-lock.yaml ]; then corepack enable && corepack prepare pnpm@latest --activate && pnpm i --frozen-lockfile;       elif [ -f yarn.lock ]; then yarn install --frozen-lockfile;       else npm install; fi
COPY . .
# Ensure base path default for Render (root)
ENV VITE_BASE_PATH=/
RUN npm run build

# ---- Runtime stage ----
FROM node:20-alpine AS runtime
WORKDIR /app
RUN npm i -g serve@14
COPY --from=build /app/dist ./dist
ENV NODE_ENV=production
# Render provides PORT env; default to 3000 locally
ENV PORT=3000
EXPOSE 3000
# Use shell to expand ${PORT}
CMD sh -c "serve -s dist -l ${PORT:-3000}"
