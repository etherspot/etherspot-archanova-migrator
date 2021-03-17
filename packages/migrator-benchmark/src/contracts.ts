import * as contractsPlatform from '@etherspot/archanova-contracts-platform';
import * as contractsEtherspot from '@etherspot/contracts';
import { TransactionRequest } from '@ethersproject/abstract-provider';
import { BigNumber, BigNumberish, Contract, ContractTransaction } from 'ethers';
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

export const erc20Token1: Contract &
  Partial<{
    balanceOf(owner: string): Promise<BigNumber>;
    depositTo(
      to: string,
      options?: TransactionRequest,
    ): Promise<ContractTransaction>;
  }> = new Contract(
  contractsEtherspot.getContractAddress(
    contractsEtherspot.ContractNames.WrappedWeiToken,
    chainId,
  ),
  contractsEtherspot.getContractAbi(
    contractsEtherspot.ContractNames.WrappedWeiToken,
  ),
  sender,
);

export const erc20Token2: Contract &
  Partial<{
    balanceOf(owner: string): Promise<BigNumber>;
    transfer(to: string, value: BigNumberish): Promise<ContractTransaction>;
    mint(amount: BigNumberish): Promise<ContractTransaction>;
  }> = new Contract(
  contractsPlatform.getContractAddress(
    contractsPlatform.ContractNames.ExampleToken,
    chainId,
  ),
  contractsPlatform.getContractAbi(
    contractsPlatform.ContractNames.ExampleToken,
  ),
  sender,
);
