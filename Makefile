db:
	redis-server --port 3001

.PHONY: server
server:
	cd server; source venv/bin/activate; uvicorn app:app --port 3000

.PHONY: client
client:
	cd client; npm run dev