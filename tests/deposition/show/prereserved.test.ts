import { afterAll, afterEach, describe, test, expect } from '@jest/globals'
import { deposition_show_prereserved } from '../../../dist/index'
import * as nock from 'nock'
import { DepositionsResponse } from '../../../src/helpers/zenodo-response-types'

afterAll(nock.restore)

afterEach(nock.cleanAll)

describe('deposition show latest', () => {
    test('shows latest draft id for depositions in collection with id 123456', async () => {
        const mocked_data: DepositionsResponse = {
            conceptrecid: 'unused',
            files: [
                {
                    filename: 'unused'
                }
            ],
            links: {
                bucket: 'unused',
                latest: 'unused'
            },
            metadata: {
                prereserve_doi: {
                    doi: prereserved_doi
                }
            },
            record_id
        }
        const sandbox = true
        nock('https://sandbox.zenodo.org/api', { reqheaders }).get(`/deposit/depositions/${record_id}`).reply(200, mocked_data).persist()
        const actual = await zenodraft.deposition_show_prereserved(sandbox, record_id)
        const expected = prereserved_doi
        expect(actual).toEqual(expected)
    })
})


if (process.env.ZENODO_SANDBOX_ACCESS_TOKEN === undefined) {
    process.env.ZENODO_SANDBOX_ACCESS_TOKEN = 'faux_zenodo_sandbox_token'
}
const prereserved_doi = '10.5281/zenodo.123456'
const record_id = '123457'
const reqheaders = {
    'Authorization': `Bearer ${process.env.ZENODO_SANDBOX_ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
}
