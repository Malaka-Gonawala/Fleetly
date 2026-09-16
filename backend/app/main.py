from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, vehicles, bookings, admin

app = FastAPI(title="Fleetly API", description="Demo API for Fleetly", version="1.0.0")

# Setup CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(vehicles.router)
app.include_router(bookings.router)
app.include_router(admin.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Fleetly API"}
