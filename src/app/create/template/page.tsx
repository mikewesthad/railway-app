"use client";

import { gql } from "@/__generated__/gql";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Modal } from "@/components/Modal";
import {
  CreatePageTemplatesQuery,
  CreatePageTemplatesFragment,
  CreatePageTemplateQuery,
} from "@/__generated__/graphql";
import { BackButtonLink } from "../components/BackButtonLink";
const templatesQuery = gql(`
  query CreatePageTemplates {
    # TODO, this should use pagination and be done on the server, but there 
    # aren't currently filtering options.
    templates {
      edges {
        node {
          ...CreatePageTemplates
        }
      }
    }
  }

  fragment CreatePageTemplates on Template {
    id
    description
    name
    category
    health
    code
    projects
  }
`);

const templateQuery = gql(`
  query CreatePageTemplate($code: String) {
    template(code: $code) {
      id
      name
      description
      category
      health
      readme
      tags
      languages
      guides {
        post
        video
      }
      serializedConfig
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

const templateDeployMutation = gql(`
  mutation CreatePageTemplateDeploy($input: TemplateDeployV2Input!) {
    templateDeployV2(input: $input) {
      projectId
      workflowId
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
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<CreatePageTemplatesFragment | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: templatesData,
    loading: templatesLoading,
    error: templatesError,
  } = useQuery(templatesQuery);

  const { data: templateData, loading: templateLoading } = useQuery<CreatePageTemplateQuery>(
    templateQuery,
    {
      variables: { code: selectedTemplate?.code },
      skip: !selectedTemplate,
    }
  );
  const sortedTemplates = useSortedTemplates(templatesData?.templates?.edges ?? []);

  const { data: workspaceData } = useQuery(workspaceQuery);

  const [deployTemplate, { loading: isDeploying }] = useMutation(templateDeployMutation);

  const handleTemplateClick = (template: CreatePageTemplatesFragment) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleDeploy = async () => {
    if (
      !selectedTemplate ||
      !templateData?.template?.serializedConfig ||
      !workspaceData?.workspace?.team?.id
    )
      return;

    try {
      const result = await deployTemplate({
        variables: {
          input: {
            templateId: selectedTemplate.id,
            serializedConfig: templateData.template.serializedConfig,
            teamId: workspaceData.workspace.team.id,
          },
        },
      });

      if (result.data?.templateDeployV2?.projectId) {
        router.push(`/workspaces/${result.data.templateDeployV2.projectId}`);
      }
    } catch (error) {
      console.error("Failed to deploy template:", error);
      // TODO: Show error message to user
    }
  };

  return (
    <main className={styles.main}>
      <div>
        <BackButtonLink href="/create" />
      </div>
      <h1>Browse Templates</h1>
      {templatesLoading && <p>Loading templates...</p>}
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedTemplate?.name || "Template Details"}
      >
        {templateLoading ? (
          <p>Loading template details...</p>
        ) : templateData?.template ? (
          <div className={styles.templateDetails}>
            <p>{templateData.template.description || "No description available"}</p>
            {templateData.template.tags && templateData.template.tags.length > 0 && (
              <div className={styles.tags}>
                {templateData.template.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {templateData.template.languages && templateData.template.languages.length > 0 && (
              <div className={styles.languages}>
                <h3>Languages</h3>
                <div className={styles.languageList}>
                  {templateData.template.languages.map((language) => (
                    <span key={language} className={styles.language}>
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {templateData.template.guides && (
              <div className={styles.guides}>
                <h3>Guides</h3>
                {templateData.template.guides.post && (
                  <a
                    href={templateData.template.guides.post}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.guideLink}
                  >
                    Documentation
                  </a>
                )}
                {templateData.template.guides.video && (
                  <a
                    href={templateData.template.guides.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.guideLink}
                  >
                    Video Tutorial
                  </a>
                )}
              </div>
            )}
            <button onClick={handleDeploy} disabled={isDeploying} className={styles.deployButton}>
              {isDeploying ? "Deploying..." : "Deploy Template"}
            </button>
          </div>
        ) : null}
      </Modal>
    </main>
  );
}
