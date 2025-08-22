export async function fetchRestaurants() {
  try {
    const response = await fetch("/api/Restaurant")
;
    if (!response.ok) throw new Error("Erreur lors du chargement des restaurants");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}