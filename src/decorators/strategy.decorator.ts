import { SetMetadata } from '@nestjs/common';
import { MetaDataKey } from '../commons';

export const StrategyDecorator = (...strategies: string[]) =>
  SetMetadata(MetaDataKey.Strategy, strategies);
