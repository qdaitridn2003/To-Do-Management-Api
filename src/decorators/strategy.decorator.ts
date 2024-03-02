import { SetMetadata } from '@nestjs/common';
import { MetaDataKey } from 'src/commons';

export const StrategyDecorator = (...strategies: string[]) =>
  SetMetadata(MetaDataKey.Strategy, strategies);
