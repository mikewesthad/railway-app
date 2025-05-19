/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query CreatePageTemplates {\n    # TODO, this should use pagination and be done on the server, but there \n    # aren't currently filtering options.\n    templates {\n      edges {\n        node {\n          ...CreatePageTemplates\n        }\n      }\n    }\n  }\n\n  fragment CreatePageTemplates on Template {\n    id\n    description\n    name\n    category\n    health\n    code\n    projects\n  }\n": typeof types.CreatePageTemplatesDocument,
    "\n  query CreatePageTemplate($code: String) {\n    template(code: $code) {\n      id\n      name\n      description\n      category\n      health\n      readme\n      tags\n      languages\n      guides {\n        post\n        video\n      }\n      serializedConfig\n    }\n  }\n": typeof types.CreatePageTemplateDocument,
    "\n  query CreatePageWorkspace {\n    workspace(workspaceId: \"14fc15eb-b61d-47bc-93b0-385d4d2b244b\") {\n      team {\n        id\n      }\n    }\n  }\n": typeof types.CreatePageWorkspaceDocument,
    "\n  mutation CreatePageTemplateDeploy($input: TemplateDeployV2Input!) {\n    templateDeployV2(input: $input) {\n      projectId\n      workflowId\n    }\n  }\n": typeof types.CreatePageTemplateDeployDocument,
    "\n  mutation templateDeployV2($input: TemplateDeployV2Input!) {\n    templateDeployV2(input: $input) {\n      projectId\n      workflowId\n    }\n  }\n": typeof types.TemplateDeployV2Document,
    "\n  query MyAccount {\n    me {\n      id\n      name\n      avatar\n      workspaces {\n        id\n        name\n      }\n    }\n  }\n": typeof types.MyAccountDocument,
    "\n  query BuildLogs($deploymentId: String!) {\n    buildLogs(deploymentId: $deploymentId) {\n      message\n      timestamp\n      severity\n    }\n  }\n": typeof types.BuildLogsDocument,
    "\n  fragment ProjectCard on Project {\n    id\n    createdAt\n    updatedAt\n    description\n    name\n    isPublic\n    # TODO: This isn't 100% right. The goal is to find the last deployment URL \n    # to expose a link & status from the dashboard. Likely the better way is to\n    # use the deployments query, which provides filtering for status and\n    # environment.\n    deployments(first: 1) {\n      edges {\n        node {\n          id\n          url\n          status\n          staticUrl\n          createdAt\n          \n        }\n      }\n    }\n    services {\n      edges {\n        node {\n          id\n          name\n          icon\n          templateThreadSlug\n          updatedAt\n        }\n      }\n    }\n  }\n": typeof types.ProjectCardFragmentDoc,
    "\n  query MyProjects {\n    workspace(workspaceId: \"14fc15eb-b61d-47bc-93b0-385d4d2b244b\") {\n      name\n      team {\n        id\n        projects {\n          edges {\n            node {\n              id\n              ...ProjectCard\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.MyProjectsDocument,
};
const documents: Documents = {
    "\n  query CreatePageTemplates {\n    # TODO, this should use pagination and be done on the server, but there \n    # aren't currently filtering options.\n    templates {\n      edges {\n        node {\n          ...CreatePageTemplates\n        }\n      }\n    }\n  }\n\n  fragment CreatePageTemplates on Template {\n    id\n    description\n    name\n    category\n    health\n    code\n    projects\n  }\n": types.CreatePageTemplatesDocument,
    "\n  query CreatePageTemplate($code: String) {\n    template(code: $code) {\n      id\n      name\n      description\n      category\n      health\n      readme\n      tags\n      languages\n      guides {\n        post\n        video\n      }\n      serializedConfig\n    }\n  }\n": types.CreatePageTemplateDocument,
    "\n  query CreatePageWorkspace {\n    workspace(workspaceId: \"14fc15eb-b61d-47bc-93b0-385d4d2b244b\") {\n      team {\n        id\n      }\n    }\n  }\n": types.CreatePageWorkspaceDocument,
    "\n  mutation CreatePageTemplateDeploy($input: TemplateDeployV2Input!) {\n    templateDeployV2(input: $input) {\n      projectId\n      workflowId\n    }\n  }\n": types.CreatePageTemplateDeployDocument,
    "\n  mutation templateDeployV2($input: TemplateDeployV2Input!) {\n    templateDeployV2(input: $input) {\n      projectId\n      workflowId\n    }\n  }\n": types.TemplateDeployV2Document,
    "\n  query MyAccount {\n    me {\n      id\n      name\n      avatar\n      workspaces {\n        id\n        name\n      }\n    }\n  }\n": types.MyAccountDocument,
    "\n  query BuildLogs($deploymentId: String!) {\n    buildLogs(deploymentId: $deploymentId) {\n      message\n      timestamp\n      severity\n    }\n  }\n": types.BuildLogsDocument,
    "\n  fragment ProjectCard on Project {\n    id\n    createdAt\n    updatedAt\n    description\n    name\n    isPublic\n    # TODO: This isn't 100% right. The goal is to find the last deployment URL \n    # to expose a link & status from the dashboard. Likely the better way is to\n    # use the deployments query, which provides filtering for status and\n    # environment.\n    deployments(first: 1) {\n      edges {\n        node {\n          id\n          url\n          status\n          staticUrl\n          createdAt\n          \n        }\n      }\n    }\n    services {\n      edges {\n        node {\n          id\n          name\n          icon\n          templateThreadSlug\n          updatedAt\n        }\n      }\n    }\n  }\n": types.ProjectCardFragmentDoc,
    "\n  query MyProjects {\n    workspace(workspaceId: \"14fc15eb-b61d-47bc-93b0-385d4d2b244b\") {\n      name\n      team {\n        id\n        projects {\n          edges {\n            node {\n              id\n              ...ProjectCard\n            }\n          }\n        }\n      }\n    }\n  }\n": types.MyProjectsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CreatePageTemplates {\n    # TODO, this should use pagination and be done on the server, but there \n    # aren't currently filtering options.\n    templates {\n      edges {\n        node {\n          ...CreatePageTemplates\n        }\n      }\n    }\n  }\n\n  fragment CreatePageTemplates on Template {\n    id\n    description\n    name\n    category\n    health\n    code\n    projects\n  }\n"): (typeof documents)["\n  query CreatePageTemplates {\n    # TODO, this should use pagination and be done on the server, but there \n    # aren't currently filtering options.\n    templates {\n      edges {\n        node {\n          ...CreatePageTemplates\n        }\n      }\n    }\n  }\n\n  fragment CreatePageTemplates on Template {\n    id\n    description\n    name\n    category\n    health\n    code\n    projects\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CreatePageTemplate($code: String) {\n    template(code: $code) {\n      id\n      name\n      description\n      category\n      health\n      readme\n      tags\n      languages\n      guides {\n        post\n        video\n      }\n      serializedConfig\n    }\n  }\n"): (typeof documents)["\n  query CreatePageTemplate($code: String) {\n    template(code: $code) {\n      id\n      name\n      description\n      category\n      health\n      readme\n      tags\n      languages\n      guides {\n        post\n        video\n      }\n      serializedConfig\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CreatePageWorkspace {\n    workspace(workspaceId: \"14fc15eb-b61d-47bc-93b0-385d4d2b244b\") {\n      team {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query CreatePageWorkspace {\n    workspace(workspaceId: \"14fc15eb-b61d-47bc-93b0-385d4d2b244b\") {\n      team {\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreatePageTemplateDeploy($input: TemplateDeployV2Input!) {\n    templateDeployV2(input: $input) {\n      projectId\n      workflowId\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePageTemplateDeploy($input: TemplateDeployV2Input!) {\n    templateDeployV2(input: $input) {\n      projectId\n      workflowId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation templateDeployV2($input: TemplateDeployV2Input!) {\n    templateDeployV2(input: $input) {\n      projectId\n      workflowId\n    }\n  }\n"): (typeof documents)["\n  mutation templateDeployV2($input: TemplateDeployV2Input!) {\n    templateDeployV2(input: $input) {\n      projectId\n      workflowId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MyAccount {\n    me {\n      id\n      name\n      avatar\n      workspaces {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query MyAccount {\n    me {\n      id\n      name\n      avatar\n      workspaces {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query BuildLogs($deploymentId: String!) {\n    buildLogs(deploymentId: $deploymentId) {\n      message\n      timestamp\n      severity\n    }\n  }\n"): (typeof documents)["\n  query BuildLogs($deploymentId: String!) {\n    buildLogs(deploymentId: $deploymentId) {\n      message\n      timestamp\n      severity\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ProjectCard on Project {\n    id\n    createdAt\n    updatedAt\n    description\n    name\n    isPublic\n    # TODO: This isn't 100% right. The goal is to find the last deployment URL \n    # to expose a link & status from the dashboard. Likely the better way is to\n    # use the deployments query, which provides filtering for status and\n    # environment.\n    deployments(first: 1) {\n      edges {\n        node {\n          id\n          url\n          status\n          staticUrl\n          createdAt\n          \n        }\n      }\n    }\n    services {\n      edges {\n        node {\n          id\n          name\n          icon\n          templateThreadSlug\n          updatedAt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ProjectCard on Project {\n    id\n    createdAt\n    updatedAt\n    description\n    name\n    isPublic\n    # TODO: This isn't 100% right. The goal is to find the last deployment URL \n    # to expose a link & status from the dashboard. Likely the better way is to\n    # use the deployments query, which provides filtering for status and\n    # environment.\n    deployments(first: 1) {\n      edges {\n        node {\n          id\n          url\n          status\n          staticUrl\n          createdAt\n          \n        }\n      }\n    }\n    services {\n      edges {\n        node {\n          id\n          name\n          icon\n          templateThreadSlug\n          updatedAt\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MyProjects {\n    workspace(workspaceId: \"14fc15eb-b61d-47bc-93b0-385d4d2b244b\") {\n      name\n      team {\n        id\n        projects {\n          edges {\n            node {\n              id\n              ...ProjectCard\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query MyProjects {\n    workspace(workspaceId: \"14fc15eb-b61d-47bc-93b0-385d4d2b244b\") {\n      name\n      team {\n        id\n        projects {\n          edges {\n            node {\n              id\n              ...ProjectCard\n            }\n          }\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;