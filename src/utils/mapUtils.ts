export interface User {
  lat: number;
  lng: number;
}

export interface GroupedUser {
  lat: number;
  lng: number;
  count: number;
}

export const groupUsersByProximity = (
  users: User[],
  proximity: number
): GroupedUser[] => {
  const grouped: GroupedUser[] = [];
  users.forEach((user) => {
    const { lat, lng } = user;
    let group = grouped.find(
      (g) =>
        Math.sqrt((g.lat - lat) ** 2 + (g.lng - lng) ** 2) * 100000 <= proximity
    );
    if (group) {
      group.count += 1;
    } else {
      grouped.push({ lat, lng, count: 1 });
    }
  });
  return grouped;
};