const TYPES = [
  { id: "DOG001", name: "Perro", prefix: "DOG", order: 1 },
  { id: "CAT001", name: "Gato", prefix: "CAT", order: 2 },
  { id: "RAB001", name: "Conejo", prefix: "RAB", order: 3 },
  { id: "HAM001", name: "Hamster", prefix: "HAM", order: 4 },
  { id: "GUI001", name: "Cobayo", prefix: "GUI", order: 5 },
  { id: "BIR001", name: "Ave domestica", prefix: "BIR", order: 6 },
  { id: "FIS001", name: "Pez", prefix: "FIS", order: 7 },
  { id: "TUR001", name: "Tortuga domestica", prefix: "TUR", order: 8 }
];

const BREEDS = [
  { name: "Mestizo", type: "Perro" },
  { name: "Callejero / No aplica", type: "Perro" },
  { name: "Labrador Retriever", type: "Perro" },
  { name: "Golden Retriever", type: "Perro" },
  { name: "Bulldog Frances", type: "Perro" },
  { name: "Bulldog Ingles", type: "Perro" },
  { name: "Pastor Aleman", type: "Perro" },
  { name: "Pastor Belga Malinois", type: "Perro" },
  { name: "Pastor Australiano", type: "Perro" },
  { name: "Poodle", type: "Perro" },
  { name: "Schnauzer", type: "Perro" },
  { name: "Chihuahua", type: "Perro" },
  { name: "Beagle", type: "Perro" },
  { name: "Shih Tzu", type: "Perro" },
  { name: "Yorkshire Terrier", type: "Perro" },
  { name: "Dachshund", type: "Perro" },
  { name: "Rottweiler", type: "Perro" },
  { name: "Boxer", type: "Perro" },
  { name: "Pitbull Terrier", type: "Perro" },
  { name: "Husky Siberiano", type: "Perro" },
  { name: "Cocker Spaniel", type: "Perro" },
  { name: "Dalmata", type: "Perro" },
  { name: "Border Collie", type: "Perro" },
  { name: "Doberman", type: "Perro" },
  { name: "Pug", type: "Perro" },
  { name: "Akita Inu", type: "Perro" },
  { name: "Samoyedo", type: "Perro" },
  { name: "San Bernardo", type: "Perro" },
  { name: "Gran Danes", type: "Perro" },
  { name: "Boston Terrier", type: "Perro" },
  { name: "Basset Hound", type: "Perro" },
  { name: "Shar Pei", type: "Perro" },
  { name: "Mastin Napolitano", type: "Perro" },
  { name: "Mestizo", type: "Gato" },
  { name: "Callejero / No aplica", type: "Gato" },
  { name: "Comun Domestico", type: "Gato" },
  { name: "Siames", type: "Gato" },
  { name: "Persa", type: "Gato" },
  { name: "Angora", type: "Gato" },
  { name: "Bengali", type: "Gato" },
  { name: "Maine Coon", type: "Gato" },
  { name: "British Shorthair", type: "Gato" },
  { name: "Scottish Fold", type: "Gato" },
  { name: "Ragdoll", type: "Gato" },
  { name: "Sphynx", type: "Gato" },
  { name: "Ruso Azul", type: "Gato" },
  { name: "Abisinio", type: "Gato" },
  { name: "Bombay", type: "Gato" },
  { name: "Birmano", type: "Gato" },
  { name: "Bosque de Noruega", type: "Gato" },
  { name: "Exotico de Pelo Corto", type: "Gato" },
  { name: "Himalayo", type: "Gato" },
  { name: "Comun Domestico", type: "Conejo" },
  { name: "Cabeza de Leon", type: "Conejo" },
  { name: "Mini Lop", type: "Conejo" },
  { name: "Belier", type: "Conejo" },
  { name: "Holandes", type: "Conejo" },
  { name: "Enano Holandes", type: "Conejo" },
  { name: "Rex", type: "Conejo" },
  { name: "Angora", type: "Conejo" },
  { name: "Mariposa Ingles", type: "Conejo" },
  { name: "Gigante de Flandes", type: "Conejo" },
  { name: "Comun Domestico", type: "Hamster" },
  { name: "Sirio", type: "Hamster" },
  { name: "Ruso", type: "Hamster" },
  { name: "Roborovski", type: "Hamster" },
  { name: "Chino", type: "Hamster" },
  { name: "Campbell", type: "Hamster" },
  { name: "Comun Domestico", type: "Cobayo" },
  { name: "Americano", type: "Cobayo" },
  { name: "Abisinio", type: "Cobayo" },
  { name: "Peruano", type: "Cobayo" },
  { name: "Texel", type: "Cobayo" },
  { name: "Sheltie", type: "Cobayo" },
  { name: "Coronet", type: "Cobayo" },
  { name: "Canario", type: "Ave domestica" },
  { name: "Periquito Australiano", type: "Ave domestica" },
  { name: "Agapornis", type: "Ave domestica" },
  { name: "Diamante Mandarin", type: "Ave domestica" },
  { name: "Gallo/Gallina domestica", type: "Ave domestica" },
  { name: "Pato domestico", type: "Ave domestica" },
  { name: "Codorniz domestica", type: "Ave domestica" },
  { name: "Paloma domestica", type: "Ave domestica" },
  { name: "Pez", type: "Pez" },
  { name: "Tortuga domestica", type: "Tortuga domestica" }
];

function getBreedCode(name) {
  if (name === "Mestizo") {
    return "MEZ";
  }

  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z]/g, "")
    .slice(0, 3)
    .toUpperCase()
    .padEnd(3, "X");
}

function buildBreeds() {
  const typeByName = new Map(TYPES.map((type) => [type.name, type]));
  const countersByType = new Map();

  return BREEDS.map((breed, index) => {
    const type = typeByName.get(breed.type);
    const nextNumber = (countersByType.get(type.id) || 0) + 1;
    countersByType.set(type.id, nextNumber);

    return {
      id: `${type.prefix}${getBreedCode(breed.name)}${String(nextNumber).padStart(3, "0")}`,
      name: breed.name,
      typeId: type.id,
      order: index + 1
    };
  });
}

module.exports = {
  TYPES,
  BREEDS: buildBreeds()
};
