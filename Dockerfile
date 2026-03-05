FROM node:22-alpine
WORKDIR /app
RUN npm init -y && npm install mcp-remote
EXPOSE 3000
ENV CARDCATALOG_API_KEY=""
CMD ["npx", "mcp-remote", "https://cardcatalog.ai/mcp"]
