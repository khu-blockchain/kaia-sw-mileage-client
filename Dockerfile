# 1) Build
FROM node:24-alpine AS builder

RUN corepack enable pnpm
WORKDIR /usr/src/app

ARG VITE_STUDENT_MANAGER_CONTRACT_ADDRESS
ENV VITE_STUDENT_MANAGER_CONTRACT_ADDRESS=${VITE_STUDENT_MANAGER_CONTRACT_ADDRESS}

COPY package*.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM alpine:latest
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist