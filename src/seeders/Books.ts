
import db from '../db.config'

db.execute(`INSERT INTO books (id, name, author, year)
VALUES
    ('1e9f2c78-ec8b-4d3a-a4d1-ef7b9ab52b1a', 'El Manifiesto Comunista', 'Karl Marx', 1848),
    ('f1a5c2c4-dad0-4328-8db2-b527d171de92', 'La Revolución Rusa', 'Richard Pipes', 1990),
    ('b7462a80-6b88-4f12-b05f-63408793e586', 'El Estado y la Revolución', 'Vladímir Lenin', 1917),
    ('1c616527-7416-4a6b-804e-5185b319e038', 'Rebelión en la Granja', 'George Orwell', 1945),
    ('8b12b0c4-5fd5-48d5-817a-152872c84db3', 'El Capital', 'Karl Marx', 1867),
    ('1dd167c3-d3f6-42c2-92ee-9fe276070a28', 'El Socialismo y el Hombre en Cuba', 'Ernesto Guevara', 1965),
    ('693cf88c-079a-4d6c-9b54-d9b336ac8d3f', 'Historia del Partido Comunista de la Unión Soviética', 'Boris Nikolaevich Ponomarev', 1938),
    ('c7fc4b9e-5b3e-4761-a6e6-8a7bdc4e8c6d', 'El origen de la familia, la propiedad privada y el Estado', 'Friedrich Engels', 1884),
    ('f7d2a96f-25cf-4a8c-bae6-06ec16df5bfc', 'La teoría de la plusvalía', 'Karl Marx', 1863),
    ('ab9c0844-8392-4c7a-a42d-11905c9e739d', '¿Qué hacer?', 'Vladímir Lenin', 1902);`, [])

console.log('insertados con exito')