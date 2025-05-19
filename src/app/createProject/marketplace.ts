import { gql } from "@/__generated__/gql";

// // Get all templates
// const MARKETPLACE = gql(`
//   query marketplace {
//     templates {
//       edges {
//         node {
//           ...MarketplaceTemplateFields
//         }
//       }
//     }
//   }

//   fragment MarketplaceTemplateFields on Template {
//     ...MarketplaceTemplateMetadataFields
//     id
//     createdAt
//     code
//     isApproved
//     demoProjectId
//     teamId
//     projects
//     health
//     creator {
//       ...TemplateCreatorFields
//     }
//   }

//   fragment MarketplaceTemplateMetadataFields on Template {
//     name
//     description
//     image
//     category
//     tags
//   }

//   fragment TemplateCreatorFields on TemplateCreator {
//     name
//     avatar
//     username
//     hasPublicProfile
//   }
// `);
