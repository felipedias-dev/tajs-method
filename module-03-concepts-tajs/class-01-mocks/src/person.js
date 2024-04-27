export class Person {
  static validate(person) {
    console.log('Validating person...');

    if (!person.name) throw new Error('name is required');
    if (!person.cpf) throw new Error('cpf is required');

    console.log('Person is valid');

    return 'ok';
  }

  static format(person) {
    console.log('Formatting person...');

    const [name, ...lastName] = person.name.split(' ');

    console.log('Person formatted');

    return {
      name,
      lastName: lastName.join(' '),
      cpf: person.cpf.replace(/\D/g, ''),
    };
  }

  static save(person) {
    console.log('Saving person...');

    if (!person.name) throw new Error('name is required');
    if (!person.lastName) throw new Error('lastName is required');
    if (!person.cpf) throw new Error('cpf is required');
    if (person.cpf.length !== 11) throw new Error('cpf is not formatted');

    console.log('Person saved!');

    return 'ok';
  }

  static process(person) {
    console.log('Processing person...');

    this.validate(person);
    const formattedPerson = this.format(person);
    this.save(formattedPerson);

    console.log('Person processed');

    return 'ok';
  }
}
