{
	"query": "mutation createAnnouncement ($projectId: ID!,$headline: String!,$contentJira: String!,$categoryID: ID!,$categoryAudienceID: ID!){createAnnouncement(input: {announcement: {projectId: $projectId,headline: $headline,contentJira: $contentJira,categories: [{ id: $categoryID }, { id: $categoryAudienceID}]}}) {announcement {id}}}",
  "variables": {
    "projectId": "pro_OSHnu79tnkPWr",
  "headline": "{{issue.summary}}",
  "contentJira": "{{issue.description.jsonEncode}}",
  "categoryID": "{{ProductAreaCat}}"
 }
}


"cat_NCJmvmvx0yA4s","cat_idXHpe4Fn4rcr","cat_jjCSCPpDetHyf"