# Stage 1: Build
FROM node:18.19 AS builder
RUN npm install -g pnpm  
ARG GIT_TOKEN
ENV GIT_TOKEN=$GIT_TOKEN
WORKDIR /usr/src/app
COPY . .
RUN pnpm install
ARG FIRE_ENV
ENV FIRE_ENV=$FIRE_ENV
RUN pnpm build

# Stage 2: Run
FROM node:18.19-alpine AS runner
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/.output .output
RUN echo "{\"tag\": \"$BUILD_TAG\", \"date\": \"$(date '+%F %T%z')\", \"branch\": \"$GIT_BRANCH\", \"commit\": \"$GIT_COMMIT\"}" > .output/public/version.json
USER 1
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]