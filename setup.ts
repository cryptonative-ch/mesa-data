import { readFile, writeFile, mkdir } from 'fs/promises'
import { TypeChain } from 'typechain/dist/TypeChain'
import { tsGenerator } from 'ts-generator'
import globby from 'globby'
import hre from 'hardhat'

/**
 * Setups up the bots
 * 1. Compiles the contracts via hardhat
 * 2. Generates the ABIs from artifacts
 * 3. Creates typed Contract factories
 */
;(async () => {
  console.info('Compiling contracts')
  // compile contracts
  await hre.run('compile')

  // fetch artifacts and build abis
  console.info('Extracting ABIs')

  const artifacts = await globby(['artifacts/contracts/*/*.json', '!artifacts/contracts/*/*.dbg.json'])

  // Create abi directory
  try {
    await mkdir('abis')
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error
    }
  }

  for (let artifact of artifacts) {
    const artifactBody = await readFile(artifact, {
      encoding: 'ascii',
    })

    const { abi, contractName } = JSON.parse(artifactBody)

    const abiPath = `abis/${contractName}.json`
    await writeFile(abiPath, JSON.stringify(abi))

    console.info(`Created ${abiPath}`)
  }

  console.info('Generting typed contracts')

  // Create typed factories
  const cwd = process.cwd()

  await tsGenerator(
    { cwd },
    new TypeChain({
      cwd,
      rawConfig: {
        files: 'abis/*.json',
        outDir: 'src/contracts',
        target: 'ethers-v5',
      },
    })
  )
})()
