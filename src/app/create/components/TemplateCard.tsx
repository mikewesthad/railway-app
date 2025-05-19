import { gql, useMutation, useQuery } from "@apollo/client";
import styles from "./TemplateCard.module.css";
import { TemplateCardFragment } from "@/__generated__/graphql";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

gql(`
  fragment TemplateCard on Template {
    id
    code
    name
    projects
    description
    category
    health
    readme
    tags
    languages
  }
`);

const templateQuery = gql(`
  query CreatePageTemplateGetConfig($code: String) {
    template(code: $code) {
      id
      serializedConfig
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

interface TemplateCardProps {
  template: TemplateCardFragment;
  teamId: string;
  onDeploy?: () => void;
  isDeploying?: boolean;
}

export function TemplateCard({ template, teamId }: TemplateCardProps) {
  const [deployTemplate, { loading: isDeploying }] = useMutation(templateDeployMutation);
  const { data: templateConfig, loading: isLoadingConfig } = useQuery(templateQuery, {
    variables: { code: template.code },
  });
  const config = templateConfig?.template?.serializedConfig;
  const router = useRouter();

  const handleDeploy = async () => {
    if (!config) {
      alert("Template config not found");
      return;
    }

    try {
      const result = await deployTemplate({
        variables: {
          input: {
            templateId: template.id,
            serializedConfig: templateConfig?.template?.serializedConfig,
            teamId: teamId,
          },
        },
      });

      if (result.data?.templateDeployV2?.projectId) {
        router.push(`/project/${result.data.templateDeployV2.projectId}`);
      }
    } catch (error) {
      console.error("Failed to deploy template:", error);
      // TODO: Show error message to user
      alert("Failed to deploy template");
    }
  };

  return (
    <div className={styles.templateDetails}>
      <h2 className={styles.templateName}>{template.name}</h2>
      <p>{template.description || "No description available"}</p>
      <div className={styles.templateMeta}>
        {template.health != null ? (
          <span className={styles.health}>Health: {template.health}</span>
        ) : null}
        {template.projects != null ? (
          <span className={styles.projects}>Projects: {template.projects.toLocaleString()}</span>
        ) : null}
        {template.category && <span className={styles.category}>{template.category}</span>}
        {template.tags && template.tags.length > 0 && (
          <div className={styles.tags}>
            {template.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <Button
        variant="primary"
        onClick={handleDeploy}
        disabled={isDeploying || isLoadingConfig}
        className={styles.deployButton}
      >
        {isLoadingConfig ? "Loading..." : isDeploying ? "Deploying..." : "Deploy Template"}
      </Button>
    </div>
  );
}
