import { gql } from "@/__generated__/gql";

// const TEMPLATE = gql(`
//   query template($owner: String, $repo: String, $code: String) {
//     template(owner: $owner, repo: $repo, code: $code) {
//       ...TemplateFields
//     }
//   }

//   fragment TemplateFields on Template {
//     ...TemplateMetadataFields
//     id
//     code
//     createdAt
//     demoProjectId
//     teamId
//     config
//     serializedConfig
//     canvasConfig
//     status
//     isApproved
//     communityThreadSlug
//     isV2Template
//     health
//     projects
//   }

//   fragment TemplateMetadataFields on Template {
//     name
//     description
//     image
//     category
//     readme
//     tags
//     languages
//     guides {
//       post
//       video
//     }
//   }
// `);
