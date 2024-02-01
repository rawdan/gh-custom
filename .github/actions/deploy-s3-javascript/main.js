const core = require('@actions/core')
const github = require('@actions/github')
const exec = require('@actions/exec')

function run() {
    // 1) Get some input values
    core.getInput('bucket', { required: true });
    const bucketRegion = core.getInput('bucket-region', { required: true });
    const distFolder = core.getInput('dist-folder', { required: true });
    core.notice('hello from my custom JavaScript action!');

    // 2) Upload Files
    const s3URI = 's3://${bucket}'
    exec.exec('aws s3 sync ${distFolder} ${s3URI} --region ${bucketRegion');

    // 3) Output website url

    const websiteUrl = 'http://${bucket}.s3-website-${bucketRegion}.amazonaws.com'
    core.setOutput('website-url', websiteUrl);
}

run();