import * as contractsPlatform from '@etherspot/archanova-contracts-platform';
import * as contractsEtherspot from '@etherspot/contracts';
import { BigNumberish, Contract, ContractTransaction } from 'ethers';
import { sender, chainId } from './constants';

export const accountProvider: Contract &
  Partial<{
    unsafeCreateAccount(
      accountId: BigNumberish,
      device: string,
      ensLabel: string,
      ensNode: string,
      refundGas: BigNumberish,
    ): Promise<ContractTransaction>;
  }> = new Contract(
  contractsPlatform.getContractAddress(
    contractsPlatform.ContractNames.AccountProviderV2,
    chainId,
  ),
  contractsPlatform.getContractAbi(
    contractsPlatform.ContractNames.AccountProviderV2,
  ),
  sender,
);

export const ensRegistry: Contract &
  Partial<{
    owner(ensNode: string): Promise<string>;
  }> = new Contract(
  contractsEtherspot.getContractAddress(
    contractsEtherspot.ContractNames.ENSRegistry,
    chainId,
  ),
  contractsEtherspot.getContractAbi(
    contractsEtherspot.ContractNames.ENSRegistry,
  ),
  sender,
);

export const erc20Token: Contract &
  Partial<{
    mint(amount: BigNumberish): Promise<ContractTransaction>;
    mintTo(to: string, amount: BigNumberish): Promise<ContractTransaction>;
  }> = new Contract(
  contractsPlatform.getContractAddress(
    contractsPlatform.ContractNames.ERC20ExampleToken,
    chainId,
  ),
  contractsPlatform.getContractAbi(
    contractsPlatform.ContractNames.ERC20ExampleToken,
  ),
  sender,
);

export const erc721Token: Contract &
  Partial<{
    mint(amount: BigNumberish): Promise<ContractTransaction>;
    mintTo(to: string, amount: BigNumberish): Promise<ContractTransaction>;
  }> = new Contract(
  contractsPlatform.getContractAddress(
    contractsPlatform.ContractNames.ERC721ExampleToken,
    chainId,
  ),
  contractsPlatform.getContractAbi(
    contractsPlatform.ContractNames.ERC721ExampleToken,
  ),
  sender,
);
