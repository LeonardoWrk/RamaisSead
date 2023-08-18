const config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
  
	theme: {
	  extend: {
		textColor: {
		  theme: {
			base: 'var(--color-secondary-base)',
			strong: 'var(--color-secondary-strong)',
		  },
		},
		backgroundColor: {
		  theme: {
			  base: 'var(--color-primary-base)',
			  secondaryBase: 'var(--color-secondary-base)',
			  strong: 'var(--color-primary-strong)',
			  soft: 'var(--color-primary-soft)',
			  purple: 'var(--color-terciary-soft)',
		  }
		},
		borderColor: {
		  theme: {
			base: 'var(--color-terciary-base)',
			strong: 'var(--color-terciary-strong)',
			soft: 'var(--color-terciary-sofy)',
		  }
		}
	  },
	},
  
	plugins: []
  };
  
  module.exports = config;