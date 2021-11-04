describe('bloomFilter', function() {
  var bloomFilter;

  beforeEach(function() {
    bloomFilter = BloomFilter();
  });

  it('should have methods named "add", "contains", and "remove"', function() {
    expect(bloomFilter.add).to.be.a('function');
    expect(bloomFilter.contains).to.be.a('function');
    expect(bloomFilter.remove).to.be.a('function');
  });

  it('should add values to a set', function() {
    bloomFilter.add('Susan Sarandon');
    bloomFilter.add('Danny Glover');
    expect(bloomFilter.contains('Danny Glover')).to.equal(true);
    expect(bloomFilter.contains('Susan Sarandon')).to.equal(true);
  });

  it('should remove values from a set', function() {
    bloomFilter.add('Mel Gibson');
    bloomFilter.remove('Mel Gibson');
    expect(bloomFilter.contains('Mel Gibson')).to.equal(false);
  });

  it('should handle all types of objects', function() {
    bloomFilter.add(5);
    bloomFilter.add('John Doe');
    bloomFilter.add({key: 'value'});
    bloomFilter.add(function () { 3 + 4; } );
    expect(bloomFilter.contains('John Doe')).to.equal(true);
    expect(bloomFilter.contains({key: 'value'})).to.equal(true);
    expect(bloomFilter.contains(function () { 3 + 4; })).to.equal(true);
  });

  it('testing accuracy of 100 array inputs and 10,000 trials.', function() {
    for (var i = 0; i < 20; i++) {
      bloomFilter.add(i);
    }

    // test loop incorrect
    for (var i = 0; i < 10000; i++) {
      bloomFilter.contains(i + 20);
    }
    console.log('misses: ' + bloomFilter.misses);
    debugger;
  });
});
