FROM oven/bun:latest AS builder
WORKDIR /build
COPY . .

ENV NODE_ENV=production
RUN bun install && \
    bun run build

FROM oven/bun:latest
WORKDIR /usr/src/app
COPY --from=builder /build/dist .

ENV NODE_ENV=production
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "server.js" ]