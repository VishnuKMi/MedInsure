const hre = require('hardhat')

async function main () {
  const MedInsure = await hre.ethers.getContractFactory('MedicalInsuranceClaim')

  const medInsure = await MedInsure.deploy()
  await medInsure.deployed()

  console.log(`MedInsure Contract deployed to ${medInsure.address}`)
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
