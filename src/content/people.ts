import type { ImageKey } from "./images";

/**
 * Single source of truth for team members: names, job titles, emails and introductions.
 * Homepage, About and Our Team all read from here; change a title once and it updates everywhere.
 */
export type Person = {
  name: string;
  role: string;
  /** Contact address. */
  email: string;
  intro: string;
  /** Official portrait, once supplied (add to the image registry). Layouts adapt automatically. */
  portrait?: ImageKey;
};

export const ceo: Person = {
  name: "Robert Albertin",
  role: "Chief Executive Officer (CEO)",
  email: "robert.albertin@blubeard-investment.com",
  intro:
    "Robert Albertin leads Blubeard Investment AG’s strategic direction, overseeing investment priorities, corporate development, and key decisions with a focus on sustainable, long-term growth.",
};

export const management: Person[] = [
  {
    name: "Albert Rubens",
    role: "Director of Finance",
    email: "albert.rubens@blubeard-investment.com",
    intro:
      "Albert Rubens oversees financial planning, resource allocation, and financial operations, supporting disciplined decision-making and maintaining a structured approach to the company’s financial management.",
  },
  {
    name: "Silvia Garcia",
    role: "Investment Coordinator",
    email: "silvia.garcia@blubeard-investment.com",
    intro:
      "Silvia Garcia coordinates investment-related activities, facilitates communication between stakeholders, and supports efficient processes that help maintain organization and consistency across investment initiatives.",
  },
  {
    name: "George Balestra",
    role: "Financial Advisor",
    email: "george.balestra@blubeard-investment.com",
    intro:
      "George Balestra contributes financial analysis and strategic perspectives, supporting the evaluation of investment opportunities, financial considerations, and informed decision-making across the organization.",
  },
  {
    name: "Daniel Atos",
    role: "Chief Operating Officer (COO)",
    email: "daniel.atos@blubeard-investment.com",
    intro:
      "Daniel Atos oversees operational coordination and organizational processes, helping align daily activities with business priorities while supporting efficiency, consistency, and effective execution.",
  },
  {
    name: "Chris Vaessen",
    role: "Management",
    email: "chris.vaessen@blubeard-investment.com",
    intro:
      "Chris Vaessen supports management activities, internal coordination, and organizational planning, contributing to effective communication, streamlined workflows, and the company’s broader operational objectives.",
  },
  {
    name: "Fabio Rubens",
    role: "Manager",
    email: "fabio.rubens@blubeard-investment.com",
    intro:
      "Fabio Rubens supports business operations and team coordination, helping maintain organized processes, effective collaboration, and consistent execution of the company’s day-to-day priorities.",
  },
];
