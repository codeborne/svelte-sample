<script>
  import TreeNav from './TreeNav.svelte'
  import SampleSection from 'src/layout/SampleSection.svelte'

  const children = [
    {
      label: 'Furniture',
      children: [
        {
          label: 'Desks',
          children: [
            {
              label: 'Standing Desks',
              children: [
                {
                  label: 'Electric Adjustable',
                  children: [
                    {
                      label: 'Premium Series',
                      children: [
                        {
                          label: 'Model X1',
                          'options': ['Oak', 'Walnut', 'White']
                        },
                        {
                          label: 'Model X2',
                          'options': ['Black', 'Gray', 'Bamboo']
                        }
                      ]
                    }
                  ]
                },
                {
                  label: 'Manual Adjustable'
                },
                {
                  label: 'Fixed Height'
                }
              ]
            },
            {
              label: 'Computer Desks'
            },
            {
              label: 'Executive Desks'
            }
          ]
        },
        {
          label: 'Chairs',
          children: [
            {
              label: 'Ergonomic Chairs',
              children: [
                {
                  label: 'High-Back'
                },
                {
                  label: 'Mid-Back'
                }
              ]
            },
            {
              label: 'Conference Chairs'
            }
          ]
        }
      ]
    },
    {
      label: 'Technology',
      children: [
        {
          label: 'Computers',
          children: [
            {
              label: 'Laptops'
            },
            {
              label: 'Desktops'
            }
          ]
        },
        {
          label: 'Printers',
          children: [
            {
              label: 'Laser Printers'
            },
            {
              label: 'Inkjet Printers'
            }
          ]
        }
      ]
    },
    {
      label: 'Office Supplies'
    }
  ]
</script>

<SampleSection title="Usage"
               description="Use TreeNav to organize nested content like folder structures, product categories, or navigation menus. It helps users browse deep hierarchies without cluttering the interface.">
  <TreeNav label="Home" {children} expanded/>
</SampleSection>
