import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Posts")
        .child(
          S.list()
            .title("Posts")
            .items([
              S.listItem()
                .title("Published")
                .child(
                  S.documentList()
                    .title("Published Posts")
                    // Sanity native: published docs have no "drafts." prefix
                    .filter('_type == "post" && !(_id in path("drafts.**"))')
                ),
              S.listItem()
                .title("Drafts")
                .child(
                  S.documentList()
                    .title("Draft Posts")
                    .filter('_type == "post" && _id in path("drafts.**")')
                ),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Tags")
        .child(S.documentTypeList("tag").title("Tags")),
    ]);
