import { addCollectionItem } from 'src/modules/common-mongo/utils/add-collection-item';
import { generateRandomMongoId } from 'src/modules/common-mongo/utils/generate-random-mongo-id';
import { compareObjectID, ensureObjectID, isValidObjectID } from 'src/modules/common-mongo/utils/ensure-object-id';

export const CommonMongoModule = {
  addCollectionItem,
  ensureObjectID,
  compareObjectID,
  isValidObjectID,
  generateRandomMongoId,
};
