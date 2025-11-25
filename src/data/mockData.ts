import { Church, Pastor } from "@/types/entities";
import churchSample1 from "@/assets/church-sample-1.jpg";
import churchSample2 from "@/assets/church-sample-2.jpg";
import churchSample3 from "@/assets/church-sample-3.jpg";
import churchSample4 from "@/assets/church-sample-4.jpg";

export const mockChurches: Church[] = [
  {
    id: "1",
    name: "Grace Community Church",
    location: "Los Angeles, CA",
    images: [churchSample1],
    head_pastor: "John MacArthur",
    members: 8500,
    income: 12500000,
  },
  {
    id: "2",
    name: "Hillsong Church",
    location: "New York, NY",
    images: [churchSample2],
    head_pastor: "Carl Lentz",
    members: 6200,
    income: 8900000,
  },
  {
    id: "3",
    name: "Lakewood Church",
    location: "Houston, TX",
    images: [churchSample3],
    head_pastor: "Joel Osteen",
    members: 52000,
    income: 89000000,
  },
  {
    id: "4",
    name: "Saddleback Church",
    location: "Lake Forest, CA",
    images: [churchSample4],
    head_pastor: "Rick Warren",
    members: 24000,
    income: 47000000,
  },
];

export const mockPastors: Pastor[] = [
  {
    id: "1",
    name: "John MacArthur",
    age: 84,
    position: "Senior Pastor",
    profile_image: "/api/placeholder/200/200",
    clergy_type: "Pastor",
  },
  {
    id: "2",
    name: "Carl Lentz",
    age: 45,
    position: "Lead Pastor",
    profile_image: "/api/placeholder/200/200",
    clergy_type: "Reverend",
  },
  {
    id: "3",
    name: "Joel Osteen",
    age: 61,
    position: "Senior Pastor",
    profile_image: "/api/placeholder/200/200",
    clergy_type: "Pastor",
  },
  {
    id: "4",
    name: "Rick Warren",
    age: 70,
    position: "Senior Pastor",
    profile_image: "/api/placeholder/200/200",
    clergy_type: "Pastor",
  },
];
