"use client";

import { gql } from "@/__generated__/gql";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import styles from "./page.module.css";
import { Modal } from "@/components/Modal";
import { CreatePageTemplatesQuery, TemplateCardFragment } from "@/__generated__/graphql";
import { BackButtonLink } from "../components/BackButtonLink";
import { TemplateCard } from "../components/TemplateCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const templatesQuery = gql(`
  query CreatePageTemplates {
    # TODO, this should use pagination and be done on the server, but there 
    # aren't currently filtering options.
    templates {
      edges {
        node {
          id
          ...TemplateCard
        }
      }
    }
  }
`);

const workspaceQuery = gql(`
  query CreatePageWorkspace {
    workspace(workspaceId: "14fc15eb-b61d-47bc-93b0-385d4d2b244b") {
      team {
        id
      }
    }
  }
`);

function useSortedTemplates(templates: CreatePageTemplatesQuery["templates"]["edges"]) {
  return templates.slice().sort((a, b) => {
    // First sort by project count (descending)
    if (a.node.projects !== b.node.projects) {
      return b.node.projects - a.node.projects;
    }

    // If project counts are equal, sort by health (descending)
    const healthA = a.node.health ?? 0;
    const healthB = b.node.health ?? 0;
    return healthB - healthA;
  });
}

export default function TemplatePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateCardFragment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: templatesData,
    loading: templatesLoading,
    error: templatesError,
  } = useQuery(templatesQuery);

  const sortedTemplates = useSortedTemplates(templatesData?.templates?.edges ?? []);

  const { data: workspaceData } = useQuery(workspaceQuery);

  const handleTemplateClick = (template: TemplateCardFragment) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  return (
    <main className={styles.main}>
      <div>
        <BackButtonLink href="/create" />
      </div>
      <h1>Browse Templates</h1>
      {templatesLoading && <LoadingSpinner />}
      {templatesError && <p>Error: {templatesError.message}</p>}
      {templatesData && (
        <div className={styles.templateGrid}>
          {sortedTemplates.map((edge) => {
            const template = edge.node;
            return (
              <div
                key={template.id}
                className={`${styles.templateCard} ${
                  selectedTemplate?.id === template.id ? styles.selected : ""
                }`}
                onClick={() => handleTemplateClick(template)}
              >
                <h2>{template.name}</h2>
                <p>{template.description || "No description available"}</p>
                <div className={styles.templateMeta}>
                  {template.category && (
                    <span className={styles.category}>{template.category}</span>
                  )}
                  {template.health !== null && (
                    <span className={styles.health}>Health: {template.health}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedTemplate && workspaceData?.workspace?.team?.id ? (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={"Deploy Template"}>
          <TemplateCard template={selectedTemplate} teamId={workspaceData?.workspace?.team?.id} />
        </Modal>
      ) : null}
    </main>
  );
}
