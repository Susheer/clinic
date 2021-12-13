import faker from 'faker';

const companies = [
  {
    id: '1',
    company: 'Uber',
    profile_pic: faker.image.imageUrl(),
    name: faker.name.findName(),
    salary: '$45K - $70K',
    prents: `${faker.name.firstName()},${faker.name.lastName()}.${faker.name.middleName()}`,
    time: 'Full Time',
    loc: 'Anywhere',
    gender: 'Male',
    mobile: '8948451168',
    opportunity:
      'Uber is looking for a Frontend Developer to join its fast growing team. This work will report to the Project Manager and work alongside the development team to help us grow our business.',
    responsabilities: {
      first:
        'Collaborate with a cross-functionnal team to develop throughtful design solutions that are beautiful and pixel-perfect.',
      second:
        'Create visualizations, site maps, user flows, wireframes, low- to hight-fidelity mockups and prototypes.',
    },
  },
  {
    id: '2',
    company: 'Nike',
    profile_pic: faker.image.imageUrl(),
    name: faker.name.findName(),
    salary: '$50K - $90K',
    prents: `${faker.name.firstName()},${faker.name.lastName()}.${faker.name.middleName()}`,
    time: 'Remote',
    loc: 'Anywhere',
    gender: 'Female',
    mobile: '8948451168',
    opportunity:
      'Nike is looking for a Senior UI Designer to join its fast growing team. This work will report to the Project Manager and work alongside the development team to help us grow our business.',
    responsabilities: {
      first:
        'Collaborate with a cross-functionnal team to develop throughtful design solutions that are beautiful and pixel-perfect.',
      second:
        'Create visualizations, site maps, user flows, wireframes, low- to hight-fidelity mockups and prototypes.',
    },
  },
  {
    id: '3',
    company: 'Apple',
    profile_pic: faker.image.imageUrl(),
    name: faker.name.findName(),
    salary: '$50K - $90K',
    prents: `${faker.name.firstName()},${faker.name.lastName()}.${faker.name.middleName()}`,
    time: 'Full Time',
    loc: 'Anywhere',
    gender: 'Female',
    mobile: '8948451168',
    opportunity:
      'Apple is looking for a Digital Marketerer to join its fast growing team. This work will report to the Head of Marketing and work alongside the development team to help us grow our business.',
    responsabilities: {
      first:
        'Collaborate with a cross-functionnal team to develop throughtful design solutions that are beautiful and pixel-perfect.',
      second:
        'Create visualizations, site maps, user flows, wireframes, low- to hight-fidelity mockups and prototypes.',
    },
  },
  {
    id: '4',
    company: 'Apple',
    gender: 'Female',
    mobile: '8948451168',
    profile_pic: faker.image.imageUrl(),
    name: faker.name.findName(),
    salary: '$50K - $90K',
    prents: `${faker.name.firstName()},${faker.name.lastName()}.${faker.name.middleName()}`,
    time: 'Full Time',
    loc: 'Anywhere',
    opportunity:
      'Apple is looking for a Digital Marketerer to join its fast growing team. This work will report to the Head of Marketing and work alongside the development team to help us grow our business.',
    responsabilities: {
      first:
        'Collaborate with a cross-functionnal team to develop throughtful design solutions that are beautiful and pixel-perfect.',
      second:
        'Create visualizations, site maps, user flows, wireframes, low- to hight-fidelity mockups and prototypes.',
    },
  },
  {
    id: '5',
    company: 'Apple',
    profile_pic: faker.image.imageUrl(),
    name: faker.name.findName(),
    salary: '$50K - $90K',
    gender: 'Female',
    mobile: '8948451168',
    prents: `${faker.name.firstName()},${faker.name.lastName()}.${faker.name.middleName()}`,
    time: 'Full Time',
    loc: 'Anywhere',
    opportunity:
      'Apple is looking for a Digital Marketerer to join its fast growing team. This work will report to the Head of Marketing and work alongside the development team to help us grow our business.',
    responsabilities: {
      first:
        'Collaborate with a cross-functionnal team to develop throughtful design solutions that are beautiful and pixel-perfect.',
      second:
        'Create visualizations, site maps, user flows, wireframes, low- to hight-fidelity mockups and prototypes.',
    },
  },
  {
    id: '6',
    company: 'Apple',
    profile_pic: faker.image.imageUrl(),
    name: faker.name.findName(),
    salary: '$50K - $90K',
    prents: `${faker.name.firstName()},${faker.name.lastName()}.${faker.name.middleName()}`,
    time: 'Full Time',
    gender: 'male',
    loc: 'Anywhere',
    gender: 'Female',
    mobile: '8948451168',
    opportunity:
      'Apple is looking for a Digital Marketerer to join its fast growing team. This work will report to the Head of Marketing and work alongside the development team to help us grow our business.',
    responsabilities: {
      first:
        'Collaborate with a cross-functionnal team to develop throughtful design solutions that are beautiful and pixel-perfect.',
      second:
        'Create visualizations, site maps, user flows, wireframes, low- to hight-fidelity mockups and prototypes.',
    },
  },
  {
    id: '7',
    company: 'Apple',
    profile_pic: faker.image.imageUrl(),
    name: faker.name.findName(),
    salary: '$50K - $90K',
    prents: `${faker.name.firstName()},${faker.name.lastName()}.${faker.name.middleName()}`,
    time: 'Full Time',
    loc: 'Anywhere',
    opportunity:
      'Apple is looking for a Digital Marketerer to join its fast growing team. This work will report to the Head of Marketing and work alongside the development team to help us grow our business.',
    responsabilities: {
      first:
        'Collaborate with a cross-functionnal team to develop throughtful design solutions that are beautiful and pixel-perfect.',
      second:
        'Create visualizations, site maps, user flows, wireframes, low- to hight-fidelity mockups and prototypes.',
    },
  },
  {
    id: '8',
    company: 'Apple',
    profile_pic: faker.image.imageUrl(),
    name: faker.name.findName(),
    salary: '$50K - $90K',
    prents: `${faker.name.firstName()},${faker.name.lastName()}.${faker.name.middleName()}`,
    time: 'Full Time',
    loc: 'Anywhere',
    gender: 'Female',
    mobile: '8948451168',
    opportunity:
      'Apple is looking for a Digital Marketerer to join its fast growing team. This work will report to the Head of Marketing and work alongside the development team to help us grow our business.',
    responsabilities: {
      first:
        'Collaborate with a cross-functionnal team to develop throughtful design solutions that are beautiful and pixel-perfect.',
      second:
        'Create visualizations, site maps, user flows, wireframes, low- to hight-fidelity mockups and prototypes.',
    },
  },
  {
    id: '9',
    company: 'Apple',
    profile_pic: faker.image.imageUrl(),
    name: faker.name.findName(),
    salary: '$50K - $90K',
    prents: `${faker.name.firstName()},${faker.name.lastName()}.${faker.name.middleName()}`,
    time: 'Full Time',
    loc: 'Anywhere',
    gender: 'Female',
    mobile: '8948451168',
    opportunity:
      'Apple is looking for a Digital Marketerer to join its fast growing team. This work will report to the Head of Marketing and work alongside the development team to help us grow our business.',
    responsabilities: {
      first:
        'Collaborate with a cross-functionnal team to develop throughtful design solutions that are beautiful and pixel-perfect.',
      second:
        'Create visualizations, site maps, user flows, wireframes, low- to hight-fidelity mockups and prototypes.',
    },
  },
];

export {companies};
