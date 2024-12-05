import { distance } from 'fastest-levenshtein';

function groupBySimilarity(items, threshold) {
  const clusters = [];

  items.forEach((item) => {
    let added = false;

    // Intenta agregar el producto a un cluster existente
    for (const cluster of clusters) {
      if (distance(item.description, cluster[0].description) <= threshold) {
        cluster.push(item);
        added = true;
        break;
      }
    }

    // Si no se agregó a ningún cluster, crea uno nuevo
    if (!added) {
      clusters.push([item]);
    }
  });

  return clusters;
}

// Función para aplanar clusters
function flattenClusters(clusters) {
  return clusters.flat();
}


export {groupBySimilarity,flattenClusters};