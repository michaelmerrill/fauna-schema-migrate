
import toJsonDeep from '../fql/to-json-deep'
import { loadFqlSnippet, retrieveAllResourcePaths, } from '../util/files'
import { addNamesAndTypes } from '../fql/types'
import { TaggedExpression, LoadedResources, StatementType } from '../types/expressions'
import { ResourceTypes } from '../types/resource-types'

export const getAllResourceSnippets = async (): Promise<LoadedResources> => {
    const paths = await retrieveAllResourcePaths()
    let snippets: TaggedExpression[] = []
    for (let i = 0; i < paths.length; i++) {
        const p = paths[i]
        const snippet = await loadFqlSnippet(p)
        const json = toJsonDeep(snippet)
        snippets.push({
            fqlExpr: snippet,
            json: json,
            fql: snippet.toFQL(),
            name: '',
            jsonData: {},
            // a resource file should always be a create!
            statement: StatementType.Create
        })
    }

    const categories: any = {}
    for (let item in ResourceTypes) {
        categories[item] = []
    }
    addNamesAndTypes(snippets)
    snippets.forEach((s) => {
        categories[<string>s.type].push(s)
    })
    return categories
}