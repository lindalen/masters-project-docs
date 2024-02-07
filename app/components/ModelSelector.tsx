import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { Model, useAppStore } from '../App';
import { Theme, theme } from '../theme';
import { createBox, createText } from '@shopify/restyle';

const Text = createText<Theme>();
const Box = createBox<Theme>();

const ModelSelector = () => {
  const model = useAppStore((state) => state.model);
  const setModel = useAppStore((state) => state.setModel);

  return (
    <Box>
        <Text style={{ 
        fontSize: 14, 
        color: theme.colors.textSecondary, 
        marginBottom: theme.spacing.xs, 
        marginLeft: theme.spacing.s 
      }}>
        Model
      </Text>
    <Picker
      selectedValue={model}
      onValueChange={(model: Model) => setModel(model)}
      style={{
        width: 200, 
        height: 44, 
        borderRadius: theme.spacing.s,
        paddingHorizontal: theme.spacing.s,
        backgroundColor: theme.colors.bgSecondary,
        color: theme.colors.textPrimary}} // Style as needed
    >
      <Picker.Item label="GPT-3.5" value={Model.GPT3} />
      <Picker.Item label="GPT-4" value={Model.GPT4} />
      <Picker.Item label="Mistral" value={Model.MISTRAL} />
    </Picker>
    </Box>
  );
};

export default ModelSelector;
