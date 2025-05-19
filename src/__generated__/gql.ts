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
    "\n  query CreatePageAssistantGetTemplate($code: String) {\n    template(code: $code) {\n      id\n      ...TemplateCard\n    }\n  }\n": typeof types.CreatePageAssistantGetTemplateDocument,
    "\n  fragment TemplateCard on Template {\n    id\n    code\n    name\n    projects\n    description\n    category\n    health\n    readme\n    tags\n    languages\n  }\n": typeof types.TemplateCardFragmentDoc,
    "\n  query CreatePageTemplateGetConfig($code: String) {\n    template(code: $code) {\n      id\n      serializedConfig\n    }\n  }\n": typeof types.CreatePageTemplateGetConfigDocument,
    "\n  mutation CreatePageTemplateDeploy($input: TemplateDeployV2Input!) {\n    templateDeployV2(input: $input) {\n      projectId\n      workflowId\n    }\n  }\n": typeof types.CreatePageTemplateDeployDocument,
    "\n  query CreatePageTemplates {\n    # TODO, this should use pagination and be done on the server, but there \n    # aren't currently filtering options.\n    templates {\n      edges {\n        node {\n          id\n          ...TemplateCard\n        }\n      }\n    }\n  }\n": typeof types.CreatePageTemplatesDocument,
    "\n  query MyAccount {\n    me {\n      id\n      name\n      avatar\n      workspaces {\n        id\n        name\n      }\n    }\n  }\n": typeof types.MyAccountDocument,
    "\n  mutation DeleteProject($id: String!) {\n    projectScheduleDelete(id: $id)\n  }\n": typeof types.DeleteProjectDocument,
    "\n  fragment ProjectPageDeploymentInfo on Deployment {\n    id\n    creator {\n      id\n      avatar\n      name\n    }\n    service {\n      id\n      name\n      icon\n    }\n    status\n    url\n    staticUrl\n    createdAt\n    updatedAt\n  }\n": typeof types.ProjectPageDeploymentInfoFragmentDoc,
    "\n  query ProjectPageGet($id: String!) {\n    project(id: $id) {\n      id\n      name\n      description\n      createdAt\n      updatedAt\n      deletedAt\n      isPublic\n      deployments(first: 10) {\n        edges {\n          node {\n            id\n            ...ProjectPageDeploymentInfo\n          }\n        }\n      }\n      services {\n        edges {\n          node {\n            id\n            name\n            icon\n          }\n        }\n      }\n      environments {\n        edges {\n          node {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n": typeof types.ProjectPageGetDocument,
    "\n  query BuildLogs($deploymentId: String!) {\n    buildLogs(deploymentId: $deploymentId) {\n      message\n      timestamp\n      severity\n    }\n  }\n": typeof types.BuildLogsDocument,
    "\n  fragment ProjectCard on Project {\n    id\n    createdAt\n    updatedAt\n    deletedAt\n    description\n    name\n    isPublic\n    services {\n      edges {\n        node {\n          id\n          name\n          icon\n          templateThreadSlug\n          updatedAt\n          deployments {\n            edges {\n              node {\n                id\n                url\n                status\n                staticUrl\n                createdAt\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.ProjectCardFragmentDoc,
    "\n  query MyProjects($workspaceId: String!) {\n    workspace(workspaceId: $workspaceId) {\n      name\n      team {\n        id\n        projects {\n          edges {\n            node {\n              id\n              ...ProjectCard\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.MyProjectsDocument,
};
const documents: Documents = {
    "\n  query CreatePageAssistantGetTemplate($code: String) {\n    template(code: $code) {\n      id\n      ...TemplateCard\n    }\n  }\n": types.CreatePageAssistantGetTemplateDocument,
    "\n  fragment TemplateCard on Template {\n    id\n    code\n    name\n    projects\n    description\n    category\n    health\n    readme\n    tags\n    languages\n  }\n": types.TemplateCardFragmentDoc,
    "\n  query CreatePageTemplateGetConfig($code: String) {\n    template(code: $code) {\n      id\n      serializedConfig\n    }\n  }\n": types.CreatePageTemplateGetConfigDocument,
    "\n  mutation CreatePageTemplateDeploy($input: TemplateDeployV2Input!) {\n    templateDeployV2(input: $input) {\n      projectId\n      workflowId\n    }\n  }\n": types.CreatePageTemplateDeployDocument,
    "\n  query CreatePageTemplates {\n    # TODO, this should use pagination and be done on the server, but there \n    # aren't currently filtering options.\n    templates {\n      edges {\n        node {\n          id\n          ...TemplateCard\n        }\n      }\n    }\n  }\n": types.CreatePageTemplatesDocument,
    "\n  query MyAccount {\n    me {\n      id\n      name\n      avatar\n      workspaces {\n        id\n        name\n      }\n    }\n  }\n": types.MyAccountDocument,
    "\n  mutation DeleteProject($id: String!) {\n    projectScheduleDelete(id: $id)\n  }\n": types.DeleteProjectDocument,
    "\n  fragment ProjectPageDeploymentInfo on Deployment {\n    id\n    creator {\n      id\n      avatar\n      name\n    }\n    service {\n      id\n      name\n      icon\n    }\n    status\n    url\n    staticUrl\n    createdAt\n    updatedAt\n  }\n": types.ProjectPageDeploymentInfoFragmentDoc,
    "\n  query ProjectPageGet($id: String!) {\n    project(id: $id) {\n      id\n      name\n      description\n      createdAt\n      updatedAt\n      deletedAt\n      isPublic\n      deployments(first: 10) {\n        edges {\n          node {\n            id\n            ...ProjectPageDeploymentInfo\n          }\n        }\n      }\n      services {\n        edges {\n          node {\n            id\n            name\n            icon\n          }\n        }\n      }\n      environments {\n        edges {\n          node {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n": types.ProjectPageGetDocument,
    "\n  query BuildLogs($deploymentId: String!) {\n    buildLogs(deploymentId: $deploymentId) {\n      message\n      timestamp\n      severity\n    }\n  }\n": types.BuildLogsDocument,
    "\n  fragment ProjectCard on Project {\n    id\n    createdAt\n    updatedAt\n    deletedAt\n    description\n    name\n    isPublic\n    services {\n      edges {\n        node {\n          id\n          name\n          icon\n          templateThreadSlug\n          updatedAt\n          deployments {\n            edges {\n              node {\n                id\n                url\n                status\n                staticUrl\n                createdAt\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.ProjectCardFragmentDoc,
    "\n  query MyProjects($workspaceId: String!) {\n    workspace(workspaceId: $workspaceId) {\n      name\n      team {\n        id\n        projects {\n          edges {\n            node {\n              id\n              ...ProjectCard\n            }\n          }\n        }\n      }\n    }\n  }\n": types.MyProjectsDocument,
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
export function gql(source: "\n  query CreatePageAssistantGetTemplate($code: String) {\n    template(code: $code) {\n      id\n      ...TemplateCard\n    }\n  }\n"): (typeof documents)["\n  query CreatePageAssistantGetTemplate($code: String) {\n    template(code: $code) {\n      id\n      ...TemplateCard\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment TemplateCard on Template {\n    id\n    code\n    name\n    projects\n    description\n    category\n    health\n    readme\n    tags\n    languages\n  }\n"): (typeof documents)["\n  fragment TemplateCard on Template {\n    id\n    code\n    name\n    projects\n    description\n    category\n    health\n    readme\n    tags\n    languages\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CreatePageTemplateGetConfig($code: String) {\n    template(code: $code) {\n      id\n      serializedConfig\n    }\n  }\n"): (typeof documents)["\n  query CreatePageTemplateGetConfig($code: String) {\n    template(code: $code) {\n      id\n      serializedConfig\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreatePageTemplateDeploy($input: TemplateDeployV2Input!) {\n    templateDeployV2(input: $input) {\n      projectId\n      workflowId\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePageTemplateDeploy($input: TemplateDeployV2Input!) {\n    templateDeployV2(input: $input) {\n      projectId\n      workflowId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query CreatePageTemplates {\n    # TODO, this should use pagination and be done on the server, but there \n    # aren't currently filtering options.\n    templates {\n      edges {\n        node {\n          id\n          ...TemplateCard\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query CreatePageTemplates {\n    # TODO, this should use pagination and be done on the server, but there \n    # aren't currently filtering options.\n    templates {\n      edges {\n        node {\n          id\n          ...TemplateCard\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MyAccount {\n    me {\n      id\n      name\n      avatar\n      workspaces {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query MyAccount {\n    me {\n      id\n      name\n      avatar\n      workspaces {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteProject($id: String!) {\n    projectScheduleDelete(id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteProject($id: String!) {\n    projectScheduleDelete(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ProjectPageDeploymentInfo on Deployment {\n    id\n    creator {\n      id\n      avatar\n      name\n    }\n    service {\n      id\n      name\n      icon\n    }\n    status\n    url\n    staticUrl\n    createdAt\n    updatedAt\n  }\n"): (typeof documents)["\n  fragment ProjectPageDeploymentInfo on Deployment {\n    id\n    creator {\n      id\n      avatar\n      name\n    }\n    service {\n      id\n      name\n      icon\n    }\n    status\n    url\n    staticUrl\n    createdAt\n    updatedAt\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ProjectPageGet($id: String!) {\n    project(id: $id) {\n      id\n      name\n      description\n      createdAt\n      updatedAt\n      deletedAt\n      isPublic\n      deployments(first: 10) {\n        edges {\n          node {\n            id\n            ...ProjectPageDeploymentInfo\n          }\n        }\n      }\n      services {\n        edges {\n          node {\n            id\n            name\n            icon\n          }\n        }\n      }\n      environments {\n        edges {\n          node {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query ProjectPageGet($id: String!) {\n    project(id: $id) {\n      id\n      name\n      description\n      createdAt\n      updatedAt\n      deletedAt\n      isPublic\n      deployments(first: 10) {\n        edges {\n          node {\n            id\n            ...ProjectPageDeploymentInfo\n          }\n        }\n      }\n      services {\n        edges {\n          node {\n            id\n            name\n            icon\n          }\n        }\n      }\n      environments {\n        edges {\n          node {\n            id\n            name\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query BuildLogs($deploymentId: String!) {\n    buildLogs(deploymentId: $deploymentId) {\n      message\n      timestamp\n      severity\n    }\n  }\n"): (typeof documents)["\n  query BuildLogs($deploymentId: String!) {\n    buildLogs(deploymentId: $deploymentId) {\n      message\n      timestamp\n      severity\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment ProjectCard on Project {\n    id\n    createdAt\n    updatedAt\n    deletedAt\n    description\n    name\n    isPublic\n    services {\n      edges {\n        node {\n          id\n          name\n          icon\n          templateThreadSlug\n          updatedAt\n          deployments {\n            edges {\n              node {\n                id\n                url\n                status\n                staticUrl\n                createdAt\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment ProjectCard on Project {\n    id\n    createdAt\n    updatedAt\n    deletedAt\n    description\n    name\n    isPublic\n    services {\n      edges {\n        node {\n          id\n          name\n          icon\n          templateThreadSlug\n          updatedAt\n          deployments {\n            edges {\n              node {\n                id\n                url\n                status\n                staticUrl\n                createdAt\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MyProjects($workspaceId: String!) {\n    workspace(workspaceId: $workspaceId) {\n      name\n      team {\n        id\n        projects {\n          edges {\n            node {\n              id\n              ...ProjectCard\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query MyProjects($workspaceId: String!) {\n    workspace(workspaceId: $workspaceId) {\n      name\n      team {\n        id\n        projects {\n          edges {\n            node {\n              id\n              ...ProjectCard\n            }\n          }\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;