import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import { withState } from '@dump247/storybook-state';

import Product from './product-component';
import Panel from '../panel';

const stories = storiesOf('Product', module);

stories.addDecorator(withKnobs);

const pannelSize = { width: '235px', marginRight: '50px' };

const exampleProduct = {
  img: 'https://images-americanas.b2w.io/produtos/01/00/sku/33446/6/33446652_4GG.jpg',
  name: 'Notebook Profissional Avell W155 MX Intel Core i7 16GB (GeForce MX150) 1TB 15.6 FullHD',
  info: {
    value: 5333.20,
  },
  expires: '2018-10-31T23:59:00.000Z',
  link: 'https://www.americanas.com.br/produto/33446653/notebook-profissional-avell-w155-mx-intel-core-i7-16gb-geforce-mx150-1tb-15-6-fullhd',
  tags: [
    {
      type: 'brand',
      value: 'acom',
    },
    {
      type: 'highlight',
      value: true,
    }
  ],
};

const exampleCupom = {
  name: '10% com o cupom ALO10',
  info: {
    value: 'UMCUPOMBEMGRANDE', //16
    rules: 'Confira as regras no site https://www.americanas.com.br/hotsite/regras-do-site',
  },
  expires: '2018-10-31T23:59:00.000Z',
  copy: 'ALO10',
  link: 'http://www.americanas.com.br/categoria/celulares-e-smartphones/f/tag-tag_alo10_acom?opn=AFLACOM&epar=b2wafiliados&franq=AFL-03-101718',
  tags: [
    {
      type: 'brand',
      value: 'shop',
    },
    {
      type: 'highlight',
      value: true,
    }
  ],
};

const exampleCat = {
  name: '10% com em telefonia',
  info: {},
  expires: '2018-10-31T23:59:00.000Z',
  link: 'http://www.americanas.com.br/categoria/celulares-e-smartphones/f/tag-tag_alo10_acom?opn=AFLACOM&epar=b2wafiliados&franq=AFL-03-101718',
  tags: [
    {
      type: 'brand',
      value: 'shop',
    },
    {
      type: 'highlight',
      value: true,
    }
  ],
};

const exampleCupomCard = {...exampleCupom, tags: []};
const exampleProductCard = {...exampleProduct, tags: [{type: 'highlight', value: true}]};
const exampleCategoryCard = {...exampleCat, tags: [{type: 'highlight', value: true}]};

stories.add('Default', () => (
  <div style={{ display: 'flex' }}>
    <Product style={pannelSize} data={object('Product', exampleProduct)} />
    &nbsp;&nbsp;&nbsp;&nbsp;
    <Product style={pannelSize} onCopy={link => `TESTE=${link}`} btnText="Pegar Cupom" data={object('Cupom', exampleCupom)} />
    &nbsp;&nbsp;&nbsp;&nbsp;
    <Panel style={pannelSize}>
      <Product onCopy={link => `TESTE=${link}`} btnText="Pegar Cupom" data={object('Categoria', exampleCat)} />
    </Panel>
  </div>
));

stories.add('Card', () => (
  <div style={{ display: 'flex' }}>
    <Product type="card" brand="acom" style={pannelSize} data={object('Product', exampleProductCard)} />
    &nbsp;&nbsp;&nbsp;&nbsp;
    <Product type="card" brand="suba" style={pannelSize} btnText="Copiar Cupom" data={object('Cupom', exampleCupomCard)} />
    &nbsp;&nbsp;&nbsp;&nbsp;
    <Product type="card" brand="shop" style={pannelSize} btnText="Copiar Cupom" data={object('Cupom', exampleCupomCard)} />
    &nbsp;&nbsp;&nbsp;&nbsp;
    <Product type="card" brand="soub" style={pannelSize} btnText="Copiar Cupom" data={object('Categoria', exampleCategoryCard)} />
  </div>
));

stories.add('Functional', withState({ loading: false, data: null, stage: 'generate' })(({ store }) => {
  const generateLink = link => {
    store.set({ loading: true });

    fetch('https://randomuser.me/api/?results=1')
      .then(res => res.json())
      .then(res => {
        store.set({ loading: false, data: res.results[0].name.first, stage: 'copy' });
      });
  }

  return (
    <div style={{ display: 'flex' }}>
      <Product
          style={pannelSize}
          data={object('Product', exampleProduct)}
          generateLoading={store.state.loading}
          onGenerate={data => generateLink(data)}
          copyValue={store.state.data}
          stage={store.state.stage}
      />

      <Product
        data={object('Product', exampleProduct)}
        generateLoading={false}
        onGenerate={data => console.log(data)}
        style={pannelSize}
      />
    </div>
  )
}));
