import { gql } from "@/__generated__/gql";

const TEMPLATE_DEPLOY_V2 = gql(`
  mutation templateDeployV2($input: TemplateDeployV2Input!) {
    templateDeployV2(input: $input) {
      projectId
      workflowId
    }
  }
`);
