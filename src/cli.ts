#!/usr/bin/env node
import commander from 'commander'
import { add_file_to_deposition } from './add-file-to-deposition.js'
import { create_empty_deposition_in_existing_collection } from './create-empty-deposition-in-existing-collection.js'
import { create_empty_deposition_in_new_collection } from './create-empty-deposition-in-new-collection.js'
import { delete_deposition_file } from './delete-deposition-file.js'
import { delete_draft_deposition } from './delete-draft-deposition.js'
import { get_deposition_details } from './get-deposition-details.js'
import { publish_draft_deposition } from './publish-draft-deposition.js'
import { update_deposition_metadata } from './update-deposition-metadata.js'


const create = (() => {
    const create = new commander.Command('create')
    create.description('subcommands for creating a deposition')

    create
        .command('in-new-collection')
        .description('create a new draft deposition in a new collection')
        .action(() => {
            create_empty_deposition_in_new_collection(zenodraft.opts().sandbox)
        })

    create
        .command('in-existing-collection')
        .arguments('<collection_id>')
        .description('create a new draft deposition as a new version in an existing collection')
        .action((collection_id: string) => {
            create_empty_deposition_in_existing_collection(zenodraft.opts().sandbox, collection_id)
        })

    return create

})()


const deposition = (() => {
    const deposition = new commander.Command('deposition')
    
    deposition.description('subcommands for depositions')

    deposition
        .addCommand(create)

    deposition
        .command('delete')
        .arguments('<id>')
        .description('delete draft deposition with id <id>')
        .action((id: string) => {
            delete_draft_deposition(zenodraft.opts().sandbox, id)
        })

    deposition
        .command('get-details')
        .arguments('<id>')
        .description('get details pertaining to deposition with id <id>')
        .action(async (id: string) => {
            const details = await get_deposition_details(zenodraft.opts().sandbox, id)
            console.log(JSON.stringify(details, null, 4))
        })

    deposition
        .command('publish')
        .arguments('<id>')
        .description('publish draft deposition with id <id>')
        .action((id: string) => {
            publish_draft_deposition(zenodraft.opts().sandbox, id)
        })

    return deposition
})()


const file = (() => {
    const file = new commander.Command('file')
    
    file.description('subcommands for files')

    file
        .command('add')
        .arguments('<id> <filename>')
        .description('add a local file with filename <filename> to existing deposition with id <id>')
        .action((id: string, filename: string) => {
            add_file_to_deposition(zenodraft.opts().sandbox, id, filename)
        })

    file
        .command('delete')
        .arguments('<id> <filename>')
        .description('delete a file with filename <filename> from draft deposition with id <id>')
        .action((id: string, filename: string) => {
            delete_deposition_file(zenodraft.opts().sandbox, id, filename)
        })

    return file
})()


const metadata = (() => {
    const metadata = new commander.Command('metadata')
    
    metadata.description('subcommands for metadata')

    metadata
        .command('update')
        .arguments('<id>')
        .description('update the metadata of existing deposition with id <id>')
        .action((id: string) => {
            update_deposition_metadata(zenodraft.opts().sandbox, id)
        })
    return metadata
})()


export const zenodraft = new commander.Command('zenodraft')
zenodraft
    .version('0.1.0')
    .description('CLI to manage depositions on Zenodo or Zenodo Sandbox.')
    .option('-s, --sandbox', 'if used, run on Zenodo Sandbox, otherwise run on Zenodo', false)
    .addCommand(deposition)
    .addCommand(file)
    .addCommand(metadata)
    .parse(process.argv)
