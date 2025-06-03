import { Collection, MongoClient, SortDirection } from "mongodb";
import dotenv from "dotenv";
import { Penguin, Researcher, Species } from "./types";
dotenv.config();

export const client = new MongoClient(process.env.CONNECTION_STRING || "mongodb://localhost:27017");

export const researchersCollection: Collection<Researcher> = client.db("natuur").collection<Researcher>("researchers");
export const speciesCollection: Collection<Species> = client.db("natuur").collection<Species>("species");
export const penguinsCollection: Collection<Penguin> = client.db("natuur").collection<Penguin>("penguins");

export const SALT_ROUNDS = 10;

async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

export async function getAllResearchers(): Promise<Researcher[]> {
    return []
}

export async function getAllSpecies(): Promise<Species[]> {
    return  []


}

export async function getSpeciesById(id: string): Promise<Species | null> {
    return null;
}

export async function updateResearcher(username: string, newPincode: string): Promise<void> {
    return await penguinsCollection.findOne({username , newPincode}) ;
}

export async function assignPenguinToResearcher(penguinId: number, researcherString: string): Promise<void> {  
    
};

export async function getAllPenguins(sortField: string, sortDirection: SortDirection, q: string): Promise<Penguin[]> {
    return [];
}

export async function getPenguinsBySpecies(id: number): Promise<Penguin[]> {
    return [];
}

export async function login(username: string, pincode: string): Promise<Researcher | null> {
        if (username === "" || pincode === "") {
        throw new Error("username and pincode required");
    }
    if (await researchersCollection.countDocuments() > 0) {
        return ;
    return null;
}

async function seedResearchers(): Promise<void> {
   const researchers : Researcher[] = await getAllResearchers()
   if (researchers.length == 0) {
   console.log("Database is empty, loading users from API")
   const response = await fetch("https://raw.githubusercontent.com/similonap/json/refs/heads/master/penguins/researchers.json")
   const researchers =  response.json();
   researchersCollection.insertMany(await researchers);
   }
}

async function seedSpecies(): Promise<void> {
     const species : Species[] = await getAllSpecies()
   if (species.length == 0) {
   console.log("Database is empty, loading users from API")
   const response = await fetch("https://raw.githubusercontent.com/similonap/json/refs/heads/master/penguins/species.json")
   const species =  response.json();
   speciesCollection.insertMany(await species); }
}

async function seedPenguins(): Promise<void> {
    const penguins : Penguin[] = await getAllPenguins()
   if (penguins.length == 0) {
   console.log("Database is empty, loading users from API")
   const response = await fetch("https://raw.githubusercontent.com/similonap/json/refs/heads/master/penguins/penguins.json")
   const penguins =  response.json();
   speciesCollection.insertMany(await penguins); }
}

export async function seedDatabase() {
    await seedResearchers();
    await seedSpecies();
    await seedPenguins();
}

export async function connect() {
    await client.connect();
    await seedDatabase();
    console.log("Connected to database");
    process.on("SIGINT", exit);
}